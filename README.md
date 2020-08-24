# gridsome-plugin-remark-embed
Gridsome Remark plugin to embed external stuff into your gridsome site.

# Live Demo

https://gridsome-preview.ilovenox.now.sh/

# Installation

```bash
npm install --save @jammeryhq/gridsome-plugin-remark-embed
```

# How to use

```js
//gridsome.config.js
module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        route: '/blog/:year/:month/:day/:slug',
        remark: {
          plugins: [
            [ '@jammeryhq/gridsome-plugin-remark-embed', {
                'enabledProviders' : ['Youtube', 'Twitter', 'Gist'],
            }]
          ]
        }
      }
    }
  ]
}
```

# Documentation

You can find the complete documentation here: https://webstone.info/documentation/gridsome-plugin-remark-embed
