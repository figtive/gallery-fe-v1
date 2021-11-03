FROM node:16-alpine as production
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build --mode production
EXPOSE 3000
ENTRYPOINT ["node", "./build"]
