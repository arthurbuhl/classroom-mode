# FCC Classroom Mode

![freeCodeCamp](https://camo.githubusercontent.com/60c67cf9ac2db30d478d21755289c423e1f985c6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66726565636f646563616d702f776964652d736f6369616c2d62616e6e65722e706e67)

[![Build Status](https://travis-ci.org/freeCodeCamp/classroom-mode.svg?branch=master)](https://travis-ci.org/freeCodeCamp/classroom-mode)

## Mission

Freecodecamp started out as a powerful platform for individuals to learn coding at their own pace from anywhere in the world. It has been a great tool for individuals. However there is a new trend where groups are using freecodecamp as a platform to learn together. Teachers are using freecodecamp in their classrooms, and study groups are forming community learning experiences.

Our goal is to serve teachers, classrooms and study groups by creating a useful group experience for them around freecodecamp.

We also serve the contributors to this project(specifically people who have not found their first tech job yet) by creating a supportive learning environment where they can find mentorship towards improving their skillset and portfolio.

## Architecture

The application currently has a react frontend and an express backend.  The frontend is located inside of the the '/client' folder, while the backend is located inside of the '/server' folder. Both the client and the server run as seperate web applications, which means that they each have a separate server. The react server is runs on port 8080, while the express server runs on port 8083.

The react server proxies requests to the express server (see /client/package.json to see how the proxy is defined).

## Install

`npm run setup` to install both server and client applications dependencies.

If running on cloud9, you must rename the .env.development.cloud9 as .env.development. Note that you should not commit this file to github.  It should be disabled when deploying to a productoin environment

To run the application, you must start both the client and the server:

`npm run dev` to start both servers

Or you may run the below script in separate terminals
```bash
npm run server
```

```bash
npm run client
```

Setup Database Configuration
```bash
cp server/variables.env.sample server/variables.env
```

Run Test
```bash
npm test
```

## Contributors

We welcome pull requests from freeCodeCamp campers (our students) and seasoned JavaScript developers alike! See the list of [contributors](https://github.com/freeCodeCamp/classroom-mode/contributors) who participated in writing this tool.

To get started the first thing you're going to want to do is fork this repository over to your personal github.

Next, go ahead and clone the repo from your repository locally. From there you have two steps:

```bash
git remote add upstream https://github.com/freeCodeCamp/classroom-mode.git
```

Then go ahead fetch the changes.

```bash
git fetch upstream
```

Afterward, you will want to create a new branch locally with `git checkout -b BRANCHNAME`

When you're done and ready for a pull request fetch and merge anything that's been done on the upstream/master into your newly created `BRANCHNAME` and resolve any merge conflicts.

## License

Copyright (c) 2018 freeCodeCamp.

The computer software in this repository is licensed under the [BSD-3-Clause](./LICENSE).