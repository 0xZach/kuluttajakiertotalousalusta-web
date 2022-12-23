# UI App Skeleton

Boilerplate configured with 
* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist), [Redux Toolkit](https://redux-toolkit.js.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Next-i18next](https://github.com/isaachinman/next-i18next) for translations
* [Jest](https://jestjs.io/) & [React Testing Library](https://github.com/testing-library/react-testing-library) for testing


#### Prerequisites For Docker
* [Docker Desktop](https://docs.docker.com/docker-for-windows/install/) <b>For Windows</b>
* [Docker Compose](https://docs.docker.com/compose/install/) <b>For Linux</b>

### Installation

In the project directory, run:
```
npm install
```
### To Run on Host 

> ***Note: Running more than one builds simultaneously will fail as next.js removes all previous builds on start up.***

#### Development

```
npm run dev
```
starts the application in development mode.

Open a browser and visit `localhost:3000` to view

#### Production

```
npm run build
```
builds the application for production, then

```
npm start
```
starts the application in production mode.

Open a browser and visit `localhost:3002` to view

#### Stage

```
npm run stage
```
runs the application in staging.

Open a browser and visit `localhost:3001` to view

#### Testing

```
npm run test
```
starts jest in watchmode, and execute tests.

#### Linting

```
npm run lint
```
executes lint checks using `eslint`

### To Run in a Docker Container

> ***Note: Docker containers must be linux architecuture based for now, we will address windows based container later.***

#### Development:
```
docker-compose up dev
```
starts the docker container for development, exposed to `localhost:3000`

#### Production:

```
docker-compose up prod
```
starts the docker container for production build, exposed to `localhost:3002`

#### Stage:

```
docker-compose up stage
```
starts the docker container for stage build, exposed to `localhost:3001`

#### Running In Background:
To run a container in background pass the `detached (-d)` flag with the command, e.g.
```
docker-compose up -d
```

#### Stopping Containers:
To stop a container running in foreground, press `Ctrl+C` once.
This will gracefully kill the container

<b>Note: Pressing `Ctrl+C` more than once, will forcefully kill the container</b>

To stop a container running in detached mode, use:
```
docker-compose down
```

### Built Using
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Typescript](https://www.typescriptlang.org/)
