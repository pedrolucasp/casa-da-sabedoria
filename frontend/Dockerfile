# https://hub.docker.com/_/node/
FROM node:22-alpine3.22

ARG UID=1000
ARG GID=1000

EXPOSE 3000

USER "${UID}:${GID}"

WORKDIR /app

RUN npm i

CMD ["npm", "run", "dev"]
