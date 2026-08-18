# hexo-tag-mermaid

A [Hexo](https://hexo.io/) tag plugin that renders [mermaid.js](https://mermaid.js.org/) diagrams on the **client side**.

The plugin turns a `{% mermaid %}` block into a `<div class="mermaid">` containing the diagram source (HTML-escaped). Rendering happens in the browser via your theme's mermaid.js setup, so no phantomjs or server-side rendering is required.

## Requirements

- Hexo >= 6 (`peerDependencies`)
- A theme that loads mermaid.js and initializes it with `startOnLoad: true`

## Installation

Install the tarball (or the repository) into your Hexo site:

```bash
# from a clone of this repo, build the tarball
npm pack --ignore-scripts      # -> hexo-tag-mermaid-<version>.tgz

# in your Hexo site
npm install ./hexo-tag-mermaid-<version>.tgz --save
```

Then add mermaid.js to your theme (e.g. in `themes/<your-theme>/layout/layout.ejs`):

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true });
</script>
```

## Usage

Wrap any mermaid diagram in a `{% mermaid %}` block. The tag takes no arguments — every diagram type is written as plain mermaid source.

### Flowchart

```
{% mermaid %}
flowchart TD
    A[Client] --> B[Load Balancer]
    B --> C[Server1]
    B --> D[Server2]
{% endmermaid %}
```

### Sequence diagram

```
{% mermaid %}
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
{% endmermaid %}
```

### Gantt chart

```
{% mermaid %}
gantt
    title A Gantt Diagram
    section Section
        A task           :a1, 2024-01-01, 30d
        Another task     :after a1, 20d
{% endmermaid %}
```

## Special characters

Diagram source is HTML-escaped when emitted, so characters like `<`, `>`, `&` and `&quot;` write naturally; mermaid.js reads them back from the element's text content.

## Development

```bash
npm install
npm test
```

The test suite (`test/index.test.js`) runs with zero extra dependencies using Node's built-in test runner.
