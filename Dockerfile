FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm install -g ts-node-dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
