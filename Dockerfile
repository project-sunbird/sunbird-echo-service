FROM dhi.io/node:22.15-dev as builder
WORKDIR /app
COPY . /app
RUN npm install

FROM dhi.io/node:22.15
COPY --from=builder /app .
EXPOSE 9595
ENTRYPOINT [ "node" ]
CMD [ "index.js" ]