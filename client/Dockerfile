FROM node:24-alpine

WORKDIR /app

# Install dependencies first for caching
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
