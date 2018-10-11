/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf } = require("nps-utils")

module.exports = {
  scripts: {
    default: "nps start",
    /**
     * Starts the builded app from the dist directory
     */
    start: {
      script: "cross-env NODE_ENV=production node dist/index.js",
      description: "Starts the builded app from the dist directory",
    },
    /**
     * Serves the current app and watches for changes to restart it
     */
    serve: {
      script: series("nps banner.serve", "nodemon --watch src --watch .env"),
      description:
        "Serves the current app and watches for changes to restart it",
    },
    /**
     * Builds the app into the dist directory
     */
    build: {
      script: series(
        "nps banner.build",
        "nps lint",
        "nps clean.dist",
        "nps transpile",
        "nps copy",
      ),
      description: "Builds the app into the dist directory",
    },
    /**
     * Runs TSLint over your project
     */
    lint: {
      script: tslint(`./src/**/*.ts`),
      hiddenFromHelp: true,
    },
    /**
     * Transpile your app into javascript
     */
    transpile: {
      script: `tsc --project ./tsconfig.json`,
      hiddenFromHelp: true,
    },
    /**
     * Clean files and folders
     */
    clean: {
      default: {
        script: series(`nps banner.clean`, `nps clean.dist`),
        description: "Deletes the ./dist folder",
      },
      dist: {
        script: rimraf("./dist"),
        hiddenFromHelp: true,
      },
    },
    /**
     * Copies static files to the build folder
     */
    copy: {
      default: {
        script: series(`nps copy.public`),
        hiddenFromHelp: true,
      },
      public: {
        script: copy("./src/public/*", "./dist"),
        hiddenFromHelp: true,
      },
    },
    /**
     * These run various kinds of tests. Default is unit.
     */
    test: {
      default: {
        script: series(
          "nps banner.testUnit",
          "nps test.pretest",
          "nps test.run",
        ),
        description: "Runs the unit tests",
      },
      pretest: {
        script: tslint(`./test/**.ts`),
        hiddenFromHelp: true,
      },
      run: {
        script: "cross-env NODE_ENV=test jest --detectOpenHandles",
        hiddenFromHelp: true,
      },
      verbose: {
        script: 'nps "test --verbose"',
        hiddenFromHelp: true,
      },
      coverage: {
        script: 'nps "test --coverage"',
        hiddenFromHelp: true,
      },
    },
    /**
     * This creates pretty banner to the terminal
     */
    banner: {
      build: banner("build"),
      serve: banner("serve"),
      testUnit: banner("test.unit"),
      clean: banner("clean"),
    },
  },
}

function banner(name) {
  return {
    hiddenFromHelp: true,
    silent: true,
    description: `Shows ${name} banners to the console`,
    script: runFast(`./utils/banner.ts ${name}`),
  }
}

function copy(source, target) {
  return `copyup ${source} ${target}`
}

function runFast(path) {
  return `ts-node --transpileOnly ${path}`
}

function tslint(path) {
  return `prettier --write ${path}`
}
