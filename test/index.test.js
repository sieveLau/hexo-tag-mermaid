'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

let registered;

global.hexo = {
  extend: {
    tag: {
      register(name, fn, options) {
        registered = { name, fn, options };
      }
    }
  }
};

require('../index.js');

function run(content) {
  assert.ok(registered, 'index.js should call hexo.extend.tag.register');
  return registered.fn([], content);
}

test('registers a block tag named mermaid', () => {
  assert.equal(registered.name, 'mermaid');
  assert.equal(registered.options.ends, true);
});

test('wraps content in a div with class mermaid', () => {
  assert.equal(run('graph TD\nA-->B'), '<div class="mermaid">\ngraph TD\nA--&gt;B\n</div>');
});

test('trims leading and trailing whitespace', () => {
  assert.equal(run('\n\n  graph TD  \n\n'), '<div class="mermaid">\ngraph TD\n</div>');
});

test('HTML-escapes special characters in the diagram source', () => {
  assert.equal(
    run('A-->B{"a < b && c > d" & X}'),
    '<div class="mermaid">\nA--&gt;B{&quot;a &lt; b &amp;&amp; c &gt; d&quot; &amp; X}\n</div>'
  );
});

test('returns an empty div for empty content', () => {
  assert.equal(run(''), '<div class="mermaid">\n\n</div>');
});
