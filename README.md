# Goofi

Let's contribute to OSS. Here is how to find good first issues in GitHub.

This is a simple app to list issues labelled as "good first issue" in repositories with over 500 stars.

![image](https://user-images.githubusercontent.com/1811616/42136471-fee7003e-7d96-11e8-8580-9da1532bdb28.png)

## Development

```shell
$ git clone git@github.com:ohbarye/goofi.git
$ cd goofi
```

### Run Frontend App

```shell
$ yarn
$ yarn start
```

### Run API Server

```shell
$ cd api
$ yarn
$ GITHUB_AUTH_TOKEN=<your token> npm start
$ open http://localhost:5000/issues?language=javascript
```

### Job

Get a list with CSV format.

```shell
$ cd job
$ yarn
$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_AUTH_TOKEN=<your token> yarn job

# See csv/ directory
```

## Release

### Frontend App

Just push master. It's automatically deployed on [Netlify](https://app.netlify.com/).

Deploy logs: https://app.netlify.com/sites/goofi/deploys

### API

To deploy API to heroku:

```shell
# At root directory
$ git push --force heroku `git subtree split --prefix api HEAD`:master
```
