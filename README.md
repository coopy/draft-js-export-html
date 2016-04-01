# DraftJS: Export ContentState to HTML

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will export your editor content to semantic HTML.

It was extracted from [React-RTE](https://react-rte.org) and placed into a separate module for more general use. Hopefully it can be helpful in your projects.

## Installation

    npm install --save draft-js-export-html

## How to Use

```js
import {stateToHTML} from 'draft-js-export-html';
let html = stateToHTML(contentState);
```

This project is still under development. If you want to help out, please open an issue to discuss or join us on [Slack](https://draftjs.slack.com/).

### Options

You can define custom inline tags to use by supplying an `options` object to `stateToHTML`:

```js
import {stateToHTML} from 'draft-js-export-html';
let options = {inlineTags: {BOLD: 'b'}};
let HTML = stateToHTML(contentState);
```

You can disable the output of block-level tags:

```js
import {stateToHTML} from 'draft-js-export-html';
let options = {blockTags: false};
let HTML = stateToHTML(contentState);
```

TODO:
- Disabling of specific block-level tags.
- Support for custom block-level tags.

## License

This software is [BSD Licensed](/LICENSE).
