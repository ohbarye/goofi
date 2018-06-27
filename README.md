# Goofi

Let's find good first issues to contribute OSS. 

This is a simple script to list issues labelled as "good first issue" in repositories with over 500 stars. This script lists the repository name, owner, and URL for each issue. The languages searched include the following:
* JavaScript
* TypeScript
* Ruby
* Go
* Java
* Python
* Shell


See this job's result: https://docs.google.com/spreadsheets/d/1-2jhSCFZUWyFsubCnGiX-xui9nA76M783Z2SOfVrEU4/edit#gid=440574128

## Usage

```
$ git clone git@github.com:ohbarye/goofi.git
$ cd goofi && npm install
```

### Job

```
$ LANGUAGE=javascript,typescript,ruby,go,java,python,shell GITHUB_AUTH_TOKEN=<your token> npm run job
```

### Server

```
$ GITHUB_AUTH_TOKEN=<your token> npm start
$ open http://localhost:3000/issues?language=javascript
```
