FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Prisma necesita DATABASE_URL durante prisma generate
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 4000

CMD ["node", "dist/index.js"]