# Goofi

Let's contribute to OSS. Here is how to find good first issues in GitHub.

This is a simple app to list issues labelled as "good first issue" in repositories with over 500 stars.

![image](https://user-images.githubusercontent.com/1811616/42405589-0130aafc-81d4-11e8-967a-e665a04ecb9c.png)

## Development

You can bootstrap everything with docker-compose.

```shell
$ git clone git@github.com:ohbarye/goofi.git && cd goofi
$ echo GITHUB_ACCESS_TOKEN=<your token> > .env
$ docker-compose up -d
$ open http://localhost:3000
```

### Without docker-compose

#### Run Frontend App

```shell
$ cd frontend
$ yarn
$ yarn start
$ open http://localhost:3000
```

#### Run API Server

```shell
$ cd api
$ yarn
$ GITHUB_ACCESS_TOKEN=<your token> npm start
$ open http://localhost:5000/issues?language=javascript
```

### Job

Get a list with CSV format.

```shell
$ cd job
$ yarn
$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_ACCESS_TOKEN=<your token> yarn job

# See csv/ directory
```

## Release

### Frontend App

Just push master. It's automatically deployed on [Netlify](https://app.netlify.com/).

Deploy logs: https://app.netlify.com/sites/goofi/deploys

### API

To deploy API to heroku:

```shell
$ git push heroku master
```

This app uses [heroku-buildpack-monorepo](https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo) to deploy sub directory.
