FROM node:20-alpine AS builder  

WORKDIR /app 

COPY package.json ./

COPY yarn.lock ./ 

RUN yarn --network-timeout 100000

ENV HUSKY_SKIP_INSTALL=1

RUN yarn install --frozen-lockfile 

COPY . .

RUN yarn build 

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh" ,"entrypoint.sh"]

EXPOSE 3001

CMD ["node", "dist/src/main.js"]