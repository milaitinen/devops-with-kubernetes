FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY index.js index.js
COPY queries.js queries.js
COPY daily.js daily.js

COPY files files

CMD ["npm", "start"]