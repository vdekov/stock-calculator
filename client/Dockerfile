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

CMD npm run dev

# ---------------------------------------
# Production stage
# ---------------------------------------
FROM node:20.9 as production

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

CMD npm run build && npm run preview