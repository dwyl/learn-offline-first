const test = require('tape');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(
  __dirname + '/../example/public/index.html',
  'utf8'
);
const DOM = new JSDOM(html);

GLOBAL.document = DOM.window.document;

const { inc, dec, update } = require('./../example/public/script');

const count = document.querySelector('.count');

test('tests dec decrements and inc increments', t => {
  let result = dec(1);
  let expected = 0;
  t.equal(result, expected, 'dec(1) returns 0');

  console.log(DOM.window.navigator.onLine);
  DOM.window.navigator.onLine = false;
  console.log(DOM.window.navigator);
  result = inc(0);
  expected = 1;
  t.equal(result, expected, 'inc(0) returns 1');
  t.end();
});

test('update updates an element', t => {
  update(5, count);
  let result = count.textContent;
  let expected = '5';
  t.equal(result, expected, 'update with 5 updates element to 5');
  update(0, count);
  result = count.textContent;
  expected = '0';
  t.equal(result, expected, 'update with 0 updates element to 0');
  t.end();
});

test('Tests that clicking the - decrements the count', t => {
  let result = count.textContent;
  let expected = '0';
  t.equal(result, expected, 'initial count is 0');

  document.querySelector('.decrement').click();
  result = count.textContent;
  expected = '-1';
  t.equal(result, expected, 'count after click is -1');
  t.end();
});

test('Tests that clicking the + increments the count', t => {
  update(0, count); // reset count to 0

  let result = count.textContent;
  let expected = '0';
  t.equal(result, expected, 'initial count is 0');

  document.querySelector('.increment').click();
  result = count.textContent;
  expected = '1';
  t.equal(result, expected, 'Count after click is 1');
  t.end();
});
