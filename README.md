# jsHighlight

A very simple syntax highlighting library for web applications.

I built this after highlight.js being too heavy, and requiring a custom build to
remove unneeded parsers, and other highlighting packages having similar issues.

## Install

```sh
git clone git@github.com/github.com/bobbylight/jshighlight.git
cd jshighlight
npm install
npm run build   # Compiles source into lib/
npm run watch   # Compiles demo app into demo/ and watches for changes
```

The demo application will be hosted at [file://path/to/jshilight/demo/index.html]().

To run tests:
```sh
npm run test     # Tests only
npm run coverage # Generates coverage report
```

Running the tests generates a coverage report:
```sh
open reports/coverage/index.html
```
