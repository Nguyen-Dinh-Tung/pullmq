FROM node:20-alpine AS base 

WORKDIR /app 

FROM base AS builder 

COPY . . 

RUN yarn install --frozen-lockfile 

RUN yarn build 

FROM base AS runner 

WORKDIR /app 

COPY --from=builder /app/yarn.lock ./yarn.lock 
COPY --from=builder /app/package.json ./package.json 

RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh


RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh" , "entrypoint.sh"]

CMD ["node" ,"dist/src/main.js"]