FROM node:alpine

COPY db.json /app/db.json
COPY routes.json /app/routes.json

RUN yarn global add json-server

EXPOSE 3000

CMD ["json-server", "-H", "0.0.0.0", "/app/db.json", "--routes", "/app/routes.json"]
