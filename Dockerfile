
FROM node:20

LABEL maintainer "kevin viscardi de souza"

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

CMD ["npm", "start"]
