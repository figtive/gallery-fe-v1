# Gallery PPL2122

Frontend for Gallery PPL 2122 Fasilkom UI.

## Develop

Simply install dependencies and run development server:

```bash
$ npm run install
$ npm run dev
```

## Deploy

`gallery-fe-v1` is containerized and pushed to [Docker Hub](https://hub.docker.com/r/figtive/galleryppl). It is tagged based on its application version, e.g. `figtive/galleryppl:fe-v1` or `figtive/galleryppl:fe-v1-v1.1.0`.

To run `gallery-fe-v1`, run the following:

```shell
$ docker run --name gallery-fe-v1 -p 8080:80 -d figtive/galleryppl:fe-v1
```
