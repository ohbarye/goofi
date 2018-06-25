# Goofi

Let's find good first issues to contribute OSS. This is a simple script to list up issues labelled as "good first issue" in repositories which has over 500 stars.

See this job's result: https://docs.google.com/spreadsheets/d/1-2jhSCFZUWyFsubCnGiX-xui9nA76M783Z2SOfVrEU4/edit#gid=440574128

## Usage

### Common

```
$ git clone git@github.com:ohbarye/goofi.git
$ cd goofi && npm install
```

### Job

$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_AUTH_TOKEN=<your token> npm run job
```

### Server

```
$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_AUTH_TOKEN=<your token> npm start
$ open http://localhost:3000/issues?language=javascript
```
