# ---------------------------------------
# Development stage
# ---------------------------------------

FROM node:20.9 as development

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh

CMD ./wait-for-it.sh database:3307 -t 0 && npm run start:dev

# ---------------------------------------
# Development stage
# ---------------------------------------

FROM node:20.9 as production

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN chmod +x wait-for-it.sh

CMD ./wait-for-it.sh database:3307 -t 0 && npm run build && npm run start:prod