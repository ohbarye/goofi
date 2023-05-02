# Goofi

Let's contribute to OSS. Here is how to find good first issues in GitHub.

This is a simple app to list issues labelled as "good first issue" in repositories with over 500 stars.

[>> Try Now <<](https://goofi.vercel.app/)

![image](https://user-images.githubusercontent.com/1811616/42405589-0130aafc-81d4-11e8-967a-e665a04ecb9c.png)

## Features

-   Server side rendering with Next.js v9
-   Deployed on [Vercel](https://vercel.com/)
-   GraphQL and Apollo

## Development

You can bootstrap everything with docker-compose.

```shell
$ git clone git@github.com:ohbarye/goofi.git && cd goofi
$ echo GITHUB_ACCESS_TOKEN=<your token> > .env
$ yarn
$ docker-compose up -d
$ open http://localhost:3000
```

### Without docker-compose

```shell
$ yarn
$ GITHUB_ACCESS_TOKEN=<your token> yarn dev
$ open http://localhost:3000
```

## Release

Run the following command to deploy to now.sh:

```shell
$ now        # Deploy staging app
$ now --prod # Deploy production app
```
