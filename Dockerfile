FROM node:alpine3.16

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm --legacy-peer-deps install

COPY . .

RUN npm run build 

EXPOSE 8081
CMD [ "http-server", "build", "-P", "http://localhost:8081?" ]
