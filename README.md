# PDF-RAG Cloud AI 🚀

A professional, cloud-powered PDF-RAG (Retrieval-Augmented Generation) application built with Next.js, Gemini AI, and Qdrant Cloud. This app allows you to upload PDF documents and have intelligent conversations with them using lightning-fast cloud AI.

## 🌟 Features

- **Gemini AI Integration**: Powered by `gemini-flash-latest` for intelligent, context-aware responses.
- **Advanced Embeddings**: Uses `gemini-embedding-001` for high-accuracy document search.
- **Cloud Vector Storage**: Persistent and scalable vector storage via **Qdrant Cloud**.
- **Modern UI/UX**: Premium landing page and a clean, intuitive chat dashboard built with Tailwind CSS.
- **Secure Authentication**: User management and authentication handled by **Clerk**.
- **Asynchronous Processing**: Background document processing using **BullMQ** and **Redis**.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Lucide React, Clerk.
- **Backend**: Node.js, Express, BullMQ, LangChain.
- **AI/ML**: Google Gemini API (Flash & Embeddings).
- **Database**: Qdrant Cloud (Vector DB), Redis (Queue).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended)
- A Google AI API Key ([Get one here](https://aistudio.google.com/))
- A Qdrant Cloud Cluster ([Get one here](https://qdrant.tech/))
- A Clerk Account ([Get one here](https://clerk.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HariKrishna-png660/PDF-RAG-CLOUD.git
   cd PDF-RAG-CLOUD
   ```

2. **Setup Backend**:
   ```bash
   cd server
   pnpm install
   cp .env.example .env # Add your Gemini & Qdrant keys here
   ```

3. **Setup Frontend**:
   ```bash
   cd ../client
   pnpm install
   cp .env.example .env.local # Add your Clerk & API URL keys here
   ```

### Running Locally

You'll need three terminal windows:

1. **Start Redis & Qdrant (Docker)**:
   ```bash
   docker-compose up -d
   ```

2. **Start Backend Server**:
   ```bash
   cd server
   pnpm dev
   ```

3. **Start Background Worker**:
   ```bash
   cd server
   pnpm dev:worker
   ```

4. **Start Frontend**:
   ```bash
   cd client
   pnpm dev
   ```

Visit `http://localhost:3000` to see the app!

## ☁️ Deployment

- **Frontend**: Deploy the `client` directory to **Vercel**.
- **Backend & Worker**: Deploy the `server` directory to **Render** or **Railway**.
- **Redis**: Use **Upstash** for a managed cloud Redis instance.

## 📄 License

MIT License - feel free to use this for your own projects!
