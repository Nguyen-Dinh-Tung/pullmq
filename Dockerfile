FROM node:20-alpine AS builder  

WORKDIR /app 

COPY package.json ./

COPY yarn.lock ./ 

RUN yarn --network-timeout 100000

RUN yarn install --frozen-lockfile 

COPY . .

RUN yarn build 

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./

COPY --from=builder /app/yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/entrypoint.sh ./

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh" ,"entrypoint.sh"]

EXPOSE 3001

CMD ["node", "dist/src/main"]