FROM node:18-alpine as BUILDER

RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build


FROM node:18-alpine as RUNNER
ENV NODE_ENV=production

RUN npm install -g pnpm
COPY --from=BUILDER /app /app
WORKDIR /app


EXPOSE 3000
CMD ["pnpm", "preview"]