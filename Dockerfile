
FROM node:20

LABEL maintainer "kevin viscardi de souza"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
