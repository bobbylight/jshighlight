# ts-webpack-app-template

A template for webpack applications written in TypeScript, based off of the excellent
[angular-typescript-webpack](https://github.com/brechtbilliet/angular-typescript-webpack).

## Install

```sh
git clone git@github.com/github.com/bobbylight/ts-webpack-app-template.git
cd ts-webpack-app-template
npm install
npm run dev
```

The application will be hosted at [http://localhost:8080]().

To run tests:
```sh
npm run test     # Tests only
npm run coverage # Generates coverage report
```

Running the tests generates a coverage report:
```sh
open reports/coverage/index.html
```

To do a production (minified) build into `dist/`:
```sh
npm install
npm run build
```

## Features

- [x] Build application with webpack - build and dev configurations
- [x] fully tested with Karma/Jasmine
- [x] Coverage report
- [x] Running tests in PhantomJS
- [x] TypeScript support
- [x] less support
- [x] Optimized build package
- [x] Minimal and straightforward setup
- [x] Watches code and refreshes browser with latest changes automatically
- [x] Sourcemap support in develop AND PRODUCTION!!! (don't deploy the js.map file with your application, but use it to debug your production app)
- [x] Nice, strict tslint rule set
- [x] .editorconfig configuration
