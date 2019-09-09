# gridsome-plugin-remark-embed
Gridsome Remark plugin to embed external stuff into your gridsome site.

## Supported providers

* Youtube - Based on https://github.com/rylandg/gridsome-plugin-remark-youtube 
* Twitter - Based on https://gridsome.org/plugins/gridsome-plugin-remark-twitter
* Github Gist - Ported from https://github.com/weirdpattern/gatsby-remark-embed-gist
* JSFiddle
* Soundcloud
* Codepen - Ported from https://github.com/weknowinc/gatsby-remark-codepen

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

| Name             | Type     | Description                               | Allowed Values                                                    | Default                 |
| ---------------- | -------- | ----------------------------------------- | ----------------------------------------------------------------- | ----------------------- |
| enabledProviders | `array`  | Defines which embed providers are enabled | `Youtube`, `Twitter`, `Gist`, `Codepen`, `Soundcloud`, `JSFiddle` | `[]`                    |
| Youtube          | `Object` | Configuration for Provider: Youtube       | see configuration below                                           | see configuration below |
| Twitter          | `Object` | Configuration for Provider: Twitter       | see configuration below                                           | see configuration below |
| Gist             | `Object` | Configuration for Provider: Gist          | see configuration below                                           | see configuration below |
| Codepen          | `Object` | Configuration for Provider: Codepen       | see configuration below                                           | see configuration below |
| Soundcloud       | `Object` | Configuration for Provider: Soundcloud    | see configuration below                                           | see configuration below |
| JSFiddle         | `Object` | Configuration for Provider: JSFiddle      | see configuration below                                           | see configuration below |
| Giphy            | `Object` | Configuration for Provider: Giphy         | see configuration below                                           | see configuration below |

## Custom Provider Template

You can overwrite the default provider template.
Just add the `template` property with the path to the `.hbs` template inside your provider config.

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

### Show only a specific file

To show only one file, you can use the following syntax inside your markdown file:

```
https://gist.github.com/<user>/<gistid>#file1.js
or
https://gist.github.com/<user>/<gistid>?file=file1.js
```

### Code Highlighting

To highlight one or more lines in a gist file, you can use the following syntax inside your markdown file:

```
https://gist.github.com/<user>/<gistid>?file=file1.js&highlights=1,3,5-10,15-20
```

## Codepen

| Name    | Type             | Description                                                                                                             | Allowed Values                | Default  |
| ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| iframe  | `boolean`        | Use iframe a embed method                                                                                               | `true`, `false`               | `false`  |
| height  | `string` / `int` | Sets the height for each pen. Value without `px` or `%`                                                                 | `0-9999`                      | `265`    |
| theme   | `string`         | Sets the theme for the pens                                                                                             | `0`, `dark`, `light`          | `0`      |
| preview | `boolean`        | Defines if the pen is running directly or after the click on "run pen"                                                  | `true`, `false`               | `true`   |
| tabs    | `array`          | Defines which tabs should be shown.<br>***Info:*** Codepen allows only result + html/js/css and not result + html + css | `result`, `html`, `js`, `css` | `result` |

### Tab Customizing for one pen

To overwrite the default tab configuration, you can use the following syntac inside your markdown file:

```
https://<codepenurl>?tabs=result,html
```

## Soundcloud

| Name          | Type             | Description                                                                               | Allowed Values               | Default   |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| width         | `string`         | Sets the maximum width for each track                                                     | valid width value e.g. 500px | 100%      |
| height        | `string` / `int` | Sets the height for each pen. Value without `px` or `%`                                   | `0-9999`                     | `81`      |
| color         | `string`         | Color play button and other controls. e.g. “#0066CC”                                      | Valid HEX Value with `#`     | `#ff5500` |
| auto_play     | `boolean`        | Start playing the item automatically                                                      | `true`, `false`              | `false`   |
| hide_related  | `boolean`        | Show/Hide related tracks                                                                  | `true`, `false`              | `false`   |
| show_comments | `boolean`        | Whether the player displays timed comments                                                | `true`, `false`              | `true`    |
| show_user     | `boolean`        | Show/Hide the uploader name                                                               | `true`, `false`              | `true`    |
| show_reposts  | `boolean`        | Show/Hide reposts                                                                         | `true`, `false`              | `false`   |
| show_teaser   | `boolean`        | Show/Hide the teaser of an track                                                          | `true`, `false`              | `true`    |
| visual        | `boolean`        | Show/Hide the image of an track                                                           | `true`, `false`              | `true`    |
| single_active | `boolean`        | If set to false the multiple players on the page won’t toggle each other off when playing | `true`, `false`              | `true`    |

### Set custom height

To change the height for one embed (e.g. you want to show a profile or a playlist), you can use the following syntax inside your markdown file:

```
https://<soundcloudurl>?height=300
```

## JSFiddle

| Name             | Type       | Description                                        | Allowed Values                | Default                           |
| ---------------- | ---------- | -------------------------------------------------- | ----------------------------- | --------------------------------- |
| width            | `string`   | Sets the maximum width for each fiddle             | valid width value e.g. 500px  | 100%                              |
| height           | `int`      | Sets the height for each fiddle                    | `0-9999`                      | `300`                             |
| iframe           | `booleant` | Use iframe instead of `<script>` to embed a fiddle | `true`, `false`               | `true`                            |
| secureConnection | `boolean`  | Use `https` instead of `http`                      | `true`, `false`               | `false`                           |
| tabs             | `array`    | Defines which tabs should be shown                 | `js`, `html`, `css`, `result` | `['js', 'html', 'css', 'result']` |
| theme            | `string`   | Defines the theem for each fiddle                  | `light`, `dark`               | `light`                           |


### Tab Customizing for one fiddle

To overwrite the default tab configuration, you can use the following syntax inside your markdown file:

```
https://<fiddleurl>?tabs=result,html
```

## Giphy

| Name       | Type      | Description                                             | Allowed Values  | Default |
| ---------- | --------- | ------------------------------------------------------- | --------------- | ------- |
| responsive | `boolean` | Use responsive embed instead of static iframe (480x480) | `true`, `false` | `true`  |

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
                    template: '~/providerTemplates/Youtube.hbs',
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

## Codepen

The Codepen embed requires the following external asset:

```
https://static.codepen.io/assets/embed/ei.js
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
* https://github.com/weknowinc
* https://github.com/gridsome

# Todos

- [ ] Add more providers
- [ ] Allow modification of Provider Templates