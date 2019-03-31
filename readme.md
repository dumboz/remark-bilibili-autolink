# Remark bilibili autolink
[![CircleCI](https://circleci.com/gh/dumboz/remark-bilibili-autolink.svg?style=svg)](https://circleci.com/gh/dumboz/remark-bilibili-autolink)
[![codecov](https://codecov.io/gh/dumboz/remark-bilibili-autolink/branch/master/graph/badge.svg)](https://codecov.io/gh/dumboz/remark-bilibili-autolink)


autolink bilibili short refs in markdown to bilibili videos & articles

## Install

with yarn:

```
yarn add remark-bilibili-autolink
```

with npm:

```
npm install --save remark-bilibili-autolink
```

## Usage

```js
const remark = require('remark');
const bili = require('remark-bilibili-autolink');

const markdown = `
# Markdown
I found a awesome video here: av47343863.
`

remark().use(bili, {
  video: true
}).process(markdown, (err, file) => {
  console.log(String(file));
})
```

## Configuration

`processor.use(bili[, options])`

This will replace words that starts with 'av'/'cv' inside `Paragraph` and `Heading` elements (see [mdast](https://github.com/syntax-tree/mdast)) with links pointing to corresponding video/article.

- article (boolean, default: `true`).

  If set to `false`, article short ref (e.g. cv123) will not be replaced.

- video (boolean, default: `true`)

  If set to `false`, video short ref (e.g. av123) will not be replaced.