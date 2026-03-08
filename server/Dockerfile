FROM node:24-alpine

WORKDIR /app

# Install dependencies first for caching
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 8000

# We use the same image for both server and worker, but different commands
CMD ["pnpm", "dev"]
