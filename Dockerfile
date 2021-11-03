FROM node:16-alpine as production
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build --mode production
EXPOSE 80
ENV HOST=80
ENTRYPOINT ["node", "./build"]
