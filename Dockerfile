FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Copy standalone server and static files
RUN cp -r .next/static .next/standalone/.next/static
RUN cp -r public .next/standalone/public

EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]