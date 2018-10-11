# Sample Typescript Service

Serves as a boilerplate for starting a new [Express.js](https://expressjs.com/) service that is written in [Typescript](https://www.typescriptlang.org/).

## Requirements

### For developing

In order to develop and run in dev mode, all that is needed is [Node](https://nodejs.org/en/) version 8 or later.

### Deploying

For deploying, having an updated version of [Docker CE](https://docs.docker.com/install/) is required.

## Setup

1. Install `Node`
2. Clone or download the contents of this repo into a folder and `cd` into it
3. Run `npm install` to download all the required dependencies.

Now you are ready to develop and deploy!

## Development

### Working

In order to add functionality, simply work within the `src` folder. The structure within `src` has no importance. The only requirement is that the main app process is run from within the `index.ts` file at the first level.

That is, the only required structure is the following

```
src
|-possibly
| `-other
|   |-files
|   |-and
|   `-folders
`-index.ts        // obligatory file
```

and the contents of `index.ts` must include a call to the listen method defined by Express.js

```typescript
my_app.listen(PORT, HOSTNAME, () => {
  // ...
})
```

somewhere.

### Installing dependencies

Whenever you install a new packge, module or library, it is of utmost importance that you declare it on the `package.json`. This should happen naturally if you install dependencies through the `npm install` command. (**note**: for development dependencies read the [next section](#development-dependencies))

Lets say you wish you install the [cors](https://github.com/expressjs/cors) middleware for your express api, simply run:

```
$ npm install -s cors
```

That should download the module onto your `node_modules` directory and declare the dependency on `package.json`.

### Development dependencies

Should you need to install any dependency that is not needed to run the application, but rather just for development, you should save the dependency under `devDependencies` on the `package.json` file.

One example of a package that would fall into this category is [moxios](https://github.com/axios/moxios), a library that allows you to mock [axios](https://github.com/axios/axios) requests for testing. This is a really useful library that you probably will use, but is not needed on the distributed version of the app, therefore the _devDependency_ tag.

One easy way to install this kind of packages is through the following command

```
$ npm install -D moxios
```

That should download the module onto your `node_modules` directory and declare the _devDependency_ on `package.json`.

### Running

In order to run locally on can simply execute `npm start serve`. This will run a version of your api on `localhost:5000` through [nodemon](https://nodemon.io/). This allows you to continue developing and the server will automatically restart for you, including the newest changes added.

### Testing

In order to write tests for your service, just write your tests on the `test` folder.
This sample service writes is tests using JavaScript's [jest.js](https://jestjs.io/) package.

As with the `src` folder, the structure within `test` is of no importance, with only two restrictions:

1. Don't touch the `preprocessor.js` file declared at the first level. (This does all the magic so your tests actually run)
2. Test files should be declared as `<filename>.test.ts`

Example tree structure:

```
test
|-messages
| |-MessageActions.test.ts
| `-Reactions.test.ts
|-users
| `User.test.ts
`preprocessor.js
```

#### Test Running

If you are using Visual Studio Code, you could install the [jest.js vscode extension](https://github.com/jest-community/vscode-jest). Once installed, simply open the command palette (`cmd + shift + P` in mac or `ctrl + shift + P` in windows and linux) and run _Jest: Start Runner_. Results will be shown on the editor.

If you are not using Visual Studio Code, simply run the following code on the project's root directory:

```
$ npm start tests
```

## Deployment

In order to deply, first you must build the distribution code of the app. In order to do so, simply run

```
$ npm start build
```

Once the dist folder has been built with no problems, build a docker image associated with this project:

```
$ docker build -t typescript-service .
```

Finally, you can run the service with the following command

```
$ docker run -p <PORT>:5000 typescript-service
```

which will setup your service on port `<PORT>` on localhost.

Additionally you may choose to run in detached mode by adding the `-d` flag.

```
$ docker run -d -p <PORT>:5000 typescript-service
```

If you do this, you may check for the container status by running `docker ps`. This container can be forcefully killed by running `docker kill <container id>`.
