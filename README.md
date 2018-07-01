# Goofi

Let's find good first issues to contribute OSS.

This is a simple script to list issues labelled as "good first issue" in repositories with over 500 stars. This script lists the repository name, owner, and URL for each issue. Any language that can be recognized by GitHub can be searched.

See this job's result: https://docs.google.com/spreadsheets/d/1-2jhSCFZUWyFsubCnGiX-xui9nA76M783Z2SOfVrEU4/edit#gid=440574128

## Usage

```shell
$ git clone git@github.com:ohbarye/goofi.git
$ cd goofi
```

### Run React App

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

To deploy API to heroku:

```shell
# At root directory
$ git push --force heroku `git subtree split --prefix api HEAD`:master
```

### Job

```shell
$ cd job
$ yarn
$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_AUTH_TOKEN=<your token> npm run job
```
