FROM node:8.12.0

LABEL author="Limbo"

WORKDIR /var/www/angular-node-service

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]


# docker build -t nginx-ps-social-service -f node.dockerfile .
# docker run -d -p 3000:3000 nginx-ps-social-service