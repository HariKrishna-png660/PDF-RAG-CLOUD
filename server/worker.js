import 'dotenv/config';
import { Worker } from 'bullmq';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(`Job:`, job.data);
    const data = JSON.parse(job.data);

    // Load the PDF manually
    const dataBuffer = fs.readFileSync(data.path);
    console.log(`File read, size: ${dataBuffer.length} bytes`);

    const pdfData = await (typeof pdf === 'function' ? pdf(dataBuffer) : pdf.default(dataBuffer)).catch(err => {
      console.error("pdf-parse error:", err);
      return null;
    });

    if (!pdfData || !pdfData.text) {
      console.error("No text extracted from PDF.");
      return;
    }

    console.log(`Extracted ${pdfData.numpages} pages, text length: ${pdfData.text.length}`);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([pdfData.text]);
    console.log(`Chunks created: ${docs.length}`);
    console.log(`First chunk preview: ${docs[0]?.pageContent.substring(0, 100)}...`);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });
    console.log(`Generating embeddings with Gemini AI...`);

    try {
      console.log(`Attempting to add ${docs.length} docs to Qdrant Cloud...`);
      await QdrantVectorStore.fromDocuments(docs, embeddings, {
        url: process.env.QDRANT_URL || 'http://localhost:6333',
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: 'langchainjs-testing',
        checkCompatibility: false,
      });
      console.log(`Successfully added docs to Qdrant Cloud`);
    } catch (error) {
      console.error(`Error adding to Qdrant:`, error);
    }
  },
  {
    concurrency: 100,
    connection: (() => {
      if (process.env.REDIS_URL) {
        const url = new URL(process.env.REDIS_URL);
        return {
          host: url.hostname,
          port: Number(url.port),
          password: url.password,
          username: url.username || 'default',
          tls: url.protocol === 'rediss:' ? {} : undefined,
        };
      }
      return {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      };
    })(),
  }
);

console.log('Worker is listening for jobs...');