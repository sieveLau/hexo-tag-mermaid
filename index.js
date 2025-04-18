'use strict';

var util = require('hexo-util');

hexo.extend.tag.register('mermaid', function (args, content) {
  const encoded = util.escapeHTML(content.trim());

  return `<div class="mermaid">
${encoded}
</div>`;
}, {ends: true});
