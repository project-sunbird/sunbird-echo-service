FROM node:22.15 as builder
WORKDIR /app
COPY . /app
RUN npm install

FROM node:22.15
COPY --from=builder /app .
EXPOSE 9595
CMD [ "node", "index.js" ]