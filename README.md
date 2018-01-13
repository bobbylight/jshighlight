# jsHighlight - Simple syntax highlighting for webapps
[![Build Status](https://travis-ci.org/bobbylight/jshighlight.svg?branch=master)](https://travis-ci.org/bobbylight/jshighlight)
[![Dependency Status](https://img.shields.io/david/bobbylight/jshighlight.svg)](https://david-dm.org/bobbylight/jshighlight)
[![Dev Dependency Status](https://img.shields.io/david/dev/bobbylight/jshighlight.svg)](https://david-dm.org/bobbylight/jshighlight?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/bobbylight/jshighlight/badge.svg?branch=master)](https://coveralls.io/github/bobbylight/jshighlight?branch=master)

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
npm test         # Tests only
npm run coverage # Generates coverage report
```

Running the tests generates a coverage report:
```sh
open coverage/index.html
```

Using the library in a TypeScript application:
```typescript
import highlighter from 'jshighlight/lib/highlighter';
import JsonParser from 'jshighlight/lib/parsers/json-parser';

...

const html: string = highlighter.highlight(new JsonParser(), jsonStr);
```