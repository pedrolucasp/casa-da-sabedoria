# https://hub.docker.com/_/node/
FROM node:22-alpine3.22

RUN apk add --no-cache -U bash

ARG UID=1000
ARG GID=1000

USER "${UID}:${GID}"

WORKDIR /app

COPY --chown="${UID}:${GID}" package*.json .

RUN npm i

COPY --chown="${UID}:${GID}" . .

EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npm", "run", "dev"]
