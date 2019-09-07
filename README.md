# gridsome-plugin-remark-embed
Gridsome Remark plugin to embed external stuff into your gridsome site.

## Supported providers

* Youtube - Based on https://github.com/rylandg/gridsome-plugin-remark-youtube 
* Twitter - Based on https://gridsome.org/plugins/gridsome-plugin-remark-twitter
* Github Gist - Ported from https://github.com/weirdpattern/gatsby-remark-embed-gist

# Installation

```bash
npm install -i @noxify/gridsome-plugin-remark-embed
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
            [ '@noxify/gridsome-plugin-remark-embed', {
                'enabledProviders' : ['Youtube', 'Twitter', 'Gist'],
            }]
          ]
        }
      }
    }
  ]
}
```

# Configuration

| Name             | Type     | Description                               | Allowed Values               | Default                 |
| ---------------- | -------- | ----------------------------------------- | ---------------------------- | ----------------------- |
| enabledProviders | `array`  | Defines which embed providers are enabled | `Youtube`, `Twitter`, `Gist` | `[]`                    |
| Youtube          | `Object` | Configuration for Provider: Youtube       | see configuration below      | see configuration below |
| Twitter          | `Object` | Configuration for Provider: Twitter       | see configuration below      | see configuration below |
| Gist             | `Object` | Configuration for Provider: Gist          | see configuration below      | see configuration below |


## Youtube

| Name  | Type             | Description                           | Allowed Values               | Default |
| ----- | ---------------- | ------------------------------------- | ---------------------------- | ------- |
| width | `string`         | Sets the maximum width for each video | valid width value e.g. 500px | 100%    |
| align | `string` / `int` | Sets the alignment for each video     | `0`, `auto`, `left`, `right` | `auto`  |

## Twitter

| Name             | Type      | Description                                  | Allowed Values                    | Default |
| ---------------- | --------- | -------------------------------------------- | --------------------------------- | ------- |
| hideConversation | `boolean` | Hides a parent thread of a tweet             | `true`, `false`                   | `true`  |
| hideMedia        | `string`  | Hides videos/photos/link previews            | `true`, `false`                   | `true`  |
| align            | `string`  | Sets the alignment for each twitt            | `none`, `left`, `center`, `right` | `none`  |
| theme            | `string`  | Sets the alignment for each video            | `light`, `dark`                   | `null`  |
| linkColor        | `string`  | Adjust the color of Tweet links              | Hex Value e.g. `#FFCC00`          | `null`  |
| widgetType       | `string`  | Sets the embed type                          | `video`                           | `null`  |
| dnt              | `boolean` | Allows/Forbids twitter to task user activity | `true`, `false`                   | `true`  |
| omitScript       | `boolean` | Automatically load/embed required resources  | `true`, `false`                   | `true`  |

## Gist

No configuration needed for this provider.

## Example

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
            [ '@noxify/gridsome-plugin-remark-embed', {
                'enabledProviders' : ['Youtube', 'Twitter', 'Gist'],
                'Youtube' : {
                    nocookie: false,
                    width: '300px',
                    align: 'left'
                },
                'Twitter' : {
                    align: 'center',
                    hideConversation: true
                }
            }]
          ]
        }
      }
    }
  ]
}
```

# External Assets

By default, the plugin do not append or load external assets, you have to add the following resources manually.

## Twitter

The Twitter embed requires the following external asset:

```
https://platform.twitter.com/widgets.js
```

## Gist

The Gist embed requires the following external asset:

```
https://github.githubassets.com/assets/gist-embed-d89dc96f3ab6372bb73ee45cafdd0711.css
```

### Get your own asset url

1. Create an new [github gist](https://gist.github.com/)
2. Add `.json` to the gist url e.g. `https://gist.github.com/<yourgithubname>/<gistid>.json`
3. Search for `stylesheet`
4. Copy the url

# Alternatives

* Twitter
  * https://gridsome.org/plugins/gridsome-plugin-remark-twitter
* Youtube
  * https://gridsome.org/plugins/gridsome-remark-plugin-youtube
  * https://gridsome.org/plugins/gridsome-plugin-remark-youtube

# Credits

Special thanks goes to

* https://github.com/weirdpattern
* https://github.com/rylandg
* https://github.com/danvega
* https://github.com/gridsome

# Todos

- [ ] Add more providers
- [ ] Allow modification of Provider Templates