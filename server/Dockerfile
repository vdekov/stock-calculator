# ---------------------------------------
# Development stage
# ---------------------------------------

FROM node:20.9 as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]