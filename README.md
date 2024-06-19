# jsHighlight - Simple syntax highlighting for webapps
![Build](https://github.com/bobbylight/jshighlight/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/bobbylight/jshighlight/actions/workflows/codeql-analysis.yml/badge.svg)
[![codecov](https://codecov.io/gh/bobbylight/jshighlight/branch/master/graph/badge.svg?token=1AzwBREy4R)](https://codecov.io/gh/bobbylight/jshighlight)

I built this after `highlight.js` being too heavy, and requiring a custom build to
remove unneeded parsers, and other highlighting packages having similar issues.

## Install

```sh
git clone git@github.com/github.com/bobbylight/jshighlight.git
cd jshighlight
npm install
npm run build   # Compiles source and builds the library into lib/
npm run dev     # Runs a demo app and watches for changes
```

The demo application will be hosted at [file://path/to/jshilight/demo/index.html]().

To run tests:
```sh
npm test         # Tests only
npm run coverage # Generates coverage report
```

The generated coverage report lives here:
```sh
open coverage/index.html
```

## Consuming the library in a TypeScript application
```typescript
import highlighter from 'jshighlight/lib/highlighter';
import JsonParser from 'jshighlight/lib/parsers/json-parser';

...

const html: string = highlighter.highlight(new JsonParser(), jsonStr);
```
