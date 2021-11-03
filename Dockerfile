FROM node:lts-buster as builder
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build --mode production

FROM node:lts-alpine3.14 as production
COPY --from=builder /build/build /app
EXPOSE 3000
CMD ["node", "app"]
