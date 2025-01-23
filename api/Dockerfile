FROM oven/bun:latest AS bun
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3000
CMD ["bun", "run", "index.ts"]