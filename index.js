'use strict';

hexo.extend.tag.register('mermaid', function (args, content) {
  const encoded = hexo.util.escapeHTML(content.trim());

  return `<div class="mermaid">
${encoded}
</div>`;
}, {ends: true});
