'use strict';

const { escapeHTML } = require('hexo-util');

hexo.extend.tag.register('mermaid', (_args, content) => {
  const encoded = escapeHTML(content.trim());

  return `<div class="mermaid">
${encoded}
</div>`;
}, { ends: true });
