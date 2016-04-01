/* @flow */
const {describe, it} = global;
import expect from 'expect';
import {ContentState, convertFromRaw} from 'draft-js';
import stateToHTML from '../stateToHTML';
import fs from 'fs';
import {join} from 'path';

function parseTestCases(raw: String) {
  // This separates the test cases in `data/test-cases.txt`.
  const SEP = '\n\n#';
  return raw.slice(1).trim().split(SEP).map((text) => {
    let lines = text.split('\n');
    let description = lines.shift().trim();
    let state = JSON.parse(lines[0]);
    let html = lines.slice(1).join('\n');
    return {description, state, html};
  });
}

function parseCustomTestCases(raw: String) {
  // This separates the test cases in `data/test-cases-custom.txt`.
  const SEP = '\n\n#';
  return raw.slice(1).trim().split(SEP).map((text) => {
    let lines = text.split('\n');
    let description = lines.shift().trim();
    let tags = JSON.parse(lines[0]);
    let state = JSON.parse(lines[1]);
    let html = lines.slice(2).join('\n');
    return {description, tags, state, html};
  });
}

let testCasesRaw = fs.readFileSync(
  join(__dirname, '..', '..', 'test', 'test-cases.txt'),
  'utf8',
);

let testCasesCustomRaw = fs.readFileSync(
  join(__dirname, '..', '..', 'test', 'test-cases-custom.txt'),
  'utf8',
);

let testCases = parseTestCases(testCasesRaw);
let testCasesCustom = parseCustomTestCases(testCasesCustomRaw);

describe('stateToHTML', () => {
  testCases.forEach((testCase) => {
    let {description, state, html} = testCase;
    it(`should render ${description}`, () => {
      let contentState = ContentState.createFromBlockArray(
        convertFromRaw(state)
      );
      expect(stateToHTML(contentState)).toBe(html);
    });
  });

  describe('Custom tags', () => {
    testCasesCustom.forEach((testCase) => {
      let {description, tags, state, html} = testCase;
      let {inlineTags, blockTags} = tags;
      it(`should render ${description}`, () => {
        let contentState = ContentState.createFromBlockArray(
          convertFromRaw(state)
        );
        expect(stateToHTML(contentState, {inlineTags, blockTags})).toBe(html);
      });
    });
  });
});
