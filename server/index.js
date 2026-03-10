import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { QdrantVectorStore } from '@langchain/qdrant';

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GOOGLE_API_KEY,
});

function getRedisConnection() {
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
}

const queue = new Queue('file-upload-queue', {
  connection: getRedisConnection(),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.json({ status: 'All Good!' });
});

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
  console.log(`Adding job to queue: ${req.file.originalname}`);
  await queue.add(
    'file-ready',
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );
  console.log(`Job added: ${req.file.originalname}`);
  return res.json({ message: 'uploaded' });
});

app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;

  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL || 'http://localhost:6333',
      apiKey: process.env.QDRANT_API_KEY, // Added Qdrant API Key
      collectionName: 'langchainjs-testing',
      checkCompatibility: false,
    }
  ).catch((err) => { // Moved .catch to the correct position
    console.error('Qdrant collection error:', err);
    return null;
  });

  if (!vectorStore) {
    return res.json({ message: "No documents processed yet. Please upload a PDF first." });
  }

  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are helfull AI Assistant who answeres the user query based on the available context from PDF File.
  Context:
  ${JSON.stringify(result)}

  User Query: ${userQuery}
  `;

  const response = await geminiModel.invoke(SYSTEM_PROMPT); // Changed to geminiModel
  const chatResponse = response.content; // Extracted content from response

  return res.json({
    message: chatResponse,
    docs: result,
  });
});

app.listen(8000, () => console.log(`Server started on PORT:${8000}`));