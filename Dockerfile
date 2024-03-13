# build
FROM node:20.9.0-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80

CMD ["npm", "start"]
# CMD ["nginx", "-g", "daemon off;"]