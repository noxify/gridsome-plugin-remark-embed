# gridsome-plugin-remark-embed
Gridsome Remark plugin to embed external stuff into your gridsome site.

# Live Demo

https://gridsome-preview.ilovenox.now.sh/

## Supported providers

* Youtube - Based on https://github.com/rylandg/gridsome-plugin-remark-youtube 
* Twitter - Based on https://gridsome.org/plugins/gridsome-plugin-remark-twitter
* Github Gist - Ported from https://github.com/weirdpattern/gatsby-remark-embed-gist
* JSFiddle
* Soundcloud
* Codepen - Ported from https://github.com/weknowinc/gatsby-remark-codepen
* Giphy
* Spotify - Ported from https://github.com/garetmckinley/gatsby-remark-embed-spotify
* Vimeo
* Flickr
* Facebook Post
* Facebook Video
* Imgur
* Instagram
* CodeSandbox

# Installation

```bash
npm install --save @noxify/gridsome-plugin-remark-embed
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

| Name             | Type     | Description                               | Allowed Values                                                                        | Default                                     |
| ---------------- | -------- | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| enabledProviders | `array`  | Defines which embed providers are enabled | `Youtube`, `Twitter`, `Gist`, `Codepen`, `Soundcloud`, `JSFiddle`, `Giphy`, `Spotify` | `[]`                                        |
| Youtube          | `Object` | Configuration for Provider: Youtube       | see [YouTube configuration](#youtube)                                                 | see [YouTube configuration](#youtube)       |
| Twitter          | `Object` | Configuration for Provider: Twitter       | see [Twitter configuration](#twitter)                                                 | see [Twitter configuration](#twitter)       |
| Gist             | `Object` | Configuration for Provider: Gist          | see [Gist configuration](#gist)                                                       | see [Gist configuration](#gist)             |
| Codepen          | `Object` | Configuration for Provider: Codepen       | see [Codepen configuration](#codepen)                                                 | see [Codepen configuration](#codepen)       |
| Soundcloud       | `Object` | Configuration for Provider: Soundcloud    | see [Soundcloud configuration](#soundcloud)                                           | see [Soundcloud configuration](#soundcloud) |
| JSFiddle         | `Object` | Configuration for Provider: JSFiddle      | see [JSFiddle configuration](#jsfiddle)                                               | see [JSFiddle configuration](#jsfiddle)     |
| Giphy            | `Object` | Configuration for Provider: Giphy         | see [Giphy configuration](#giphy)                                                     | see [Giphy configuration](#giphy)           |
| Spotify          | `Object` | Configuration for Provider: Spotify       | see [Spotify configuration](#spotify)                                                 | see [Spotify configuration](#spotify)       |
| Vimeo            | `Object` | Configuration for Provider: Vimeo         | see [Vimeo configuration](#vimeo)                                                     | see [Vimeo configuration](#vimeo)           |
| Flickr           | `Object` | Configuration for Provider: Flickr        | see [Flickr configuration](#flickr)                                                    | see [Flickr configuration](#flickr)         |
| Facebook Post          | `Object` | Configuration for Provider: Facebook Post        | see [Facebook Post configuration](#facebook-post)                                                    | see [Facebook Posts configuration](#facebook-post)         |
| Facebook Video           | `Object` | Configuration for Provider: Facebook Video        | see [Facebook Video configuration](#facebook-video)                                                    | see [Facebook Video configuration](#facebook-video)         |
| Imgur           | `Object` | Configuration for Provider: Imgur        | see [Flickr configuration](#imgur)                                                    | see [Imgur configuration](#imgur)         |
| Instagram           | `Object` | Configuration for Provider: Instagram        | see [Instagram configuration](#instagram)                                                    | see [Instagram configuration](#instagram)         |
| CodeSandbox           | `Object` | Configuration for Provider: CodeSandbox        | see [CodeSandbox configuration](#codesandbox)                                                    | see [CodeSandbox configuration](#codesandbox)         |


## Custom Provider Template

You can overwrite the default provider template.
Just add the `template` property with the path to the `.hbs` template inside your provider config.

```js
remark: {
  plugins: [
    [ '@noxify/gridsome-plugin-remark-embed', {
        'enabledProviders' : ['Youtube', 'Twitter', 'Gist'],
        'Youtube' : {
            template: './src/providerTemplates/Youtube.hbs',
        },
        
    }]
  ]
}
```

> Behind the scenes, we're using `path.resolve()` to get the absolute path 
> the example path is based on your project route
> like the baseDir from the `@gridsome/source-filesystem`

## Youtube

| Name   | Type                 | Description                                                                                   | Allowed Values               | Default           |
| ------ | -------------------- | --------------------------------------------------------------------------------------------- | ---------------------------- | ----------------- |
| width  | `string`             | Sets the maximum width for each video                                                         | valid width value e.g. 500px | 100%              |
| align  | `string` / `int`     | Sets the alignment for each video                                                             | `0`, `auto`                  | `auto`            |
| margin | `string` / `boolean` | Allows to set a custom margin value. <br>Set `false` to disable the `margin` inside the html. | `false`, `5px 5px 5px 5px`   | `0 <align value>` |

## Twitter

| Name             | Type      | Description                                  | Allowed Values                    | Default |
| ---------------- | --------- | -------------------------------------------- | --------------------------------- | ------- |
| hideConversation | `boolean` | Hides a parent thread of a tweet             | `true`, `false`                   | `true`  |
| hideMedia        | `string`  | Hides videos/photos/link previews            | `true`, `false`                   | `true`  |
| align            | `string`  | Sets the alignment for each embed            | `none`, `left`, `center`, `right` | `none`  |
| theme            | `string`  | Sets the theme for the embeds                | `light`, `dark`                   | `null`  |
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
| iframe  | `boolean`        | Use iframe embed method                                                                                                 | `true`, `false`               | `false`  |
| height  | `string` / `int` | Sets the height for each pen. Value without `px` or `%`                                                                 | `0-9999`                      | `265`    |
| theme   | `string`         | Sets the theme for the pens                                                                                             | `0`, `dark`, `light`          | `0`      |
| preview | `boolean`        | Defines if the pen is running directly or after the click on "run pen"                                                  | `true`, `false`               | `true`   |
| tabs    | `array`          | Defines which tabs should be shown.<br>***Info:*** Codepen allows only result + html/js/css and not result + html + css | `result`, `html`, `js`, `css` | `result` |

### Tab Customizing for one pen

To overwrite the default tab configuration, you can use the following syntax inside your markdown file:

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
| show_teaser   | `boolean`        | Show/Hide the teaser of a track                                                           | `true`, `false`              | `true`    |
| visual        | `boolean`        | Show/Hide the image of a track                                                            | `true`, `false`              | `true`    |
| single_active | `boolean`        | If set to false the multiple players on the page won’t toggle each other off when playing | `true`, `false`              | `true`    |

### Set custom height

To change the height for one embed (e.g. you want to show a profile or a playlist), you can use the following syntax inside your markdown file:

```
https://<soundcloudurl>?height=300
```

## JSFiddle

| Name             | Type      | Description                                        | Allowed Values                | Default                           |
| ---------------- | --------- | -------------------------------------------------- | ----------------------------- | --------------------------------- |
| width            | `string`  | Sets the maximum width for each fiddle             | valid width value e.g. 500px  | 100%                              |
| height           | `int`     | Sets the height for each fiddle                    | `0-9999`                      | `300`                             |
| iframe           | `boolean` | Use iframe instead of `<script>` to embed a fiddle | `true`, `false`               | `true`                            |
| secureConnection | `boolean` | Use `https` instead of `http`                      | `true`, `false`               | `false`                           |
| tabs             | `array`   | Defines which tabs should be shown                 | `js`, `html`, `css`, `result` | `['js', 'html', 'css', 'result']` |
| theme            | `string`  | Defines the theme for each fiddle                  | `light`, `dark`               | `light`                           |


### Tab Customizing for one fiddle

To overwrite the default tab configuration, you can use the following syntax inside your markdown file:

```
https://<fiddleurl>?tabs=result,html
```

## Giphy

| Name       | Type      | Description                                             | Allowed Values  | Default |
| ---------- | --------- | ------------------------------------------------------- | --------------- | ------- |
| responsive | `boolean` | Use responsive embed instead of static iframe (480x480) | `true`, `false` | `true`  |

## Spotify

| Name   | Type     | Description                            | Allowed Values  | Default |
| ------ | -------- | -------------------------------------- | --------------- | ------- |
| width  | `string` | Sets the maximum width for the iframe  | `400px`, `100%` | `300px` |
| height | `string` | Sets the maximum height for the iframe | `400px`, `100%` | `380px` |

## Vimeo

| Name       | Type      | Description                                                    | Allowed Values  | Default |
| ---------- | --------- | -------------------------------------------------------------- | --------------- | ------- |
| width      | `string`  | Sets the maximum width for the iframe                          | `400px`, `100%` | `640px` |
| height     | `string`  | Sets the maximum height for the iframe                         | `400px`, `100%` | `360px` |
| responsive | `boolean` | Use responsive  iframe (if true, width and height are ignored) | `true`, `false` | `false` |
| autoplay   | `boolean` | Start the video automatically                                  | `true`, `false` | `false` |
| loop       | `boolean` | Run the video in a loop                                        | `true`, `false` | `false` |

## Flickr

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| width         | `integer`  | Sets the maximum width for the embed               | `1024`          | `1024`  |
| height        | `integer`  | Sets the maximum height for the embed              | `768`           | `768`   |
| omitscript | `boolean` | Removes the `<script>` part from the response html | `true`, `false` | `true`  |

## Facebook Post

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| width         | `integer`  | Sets the maximum width for the embed               | `100%`, `400px` | `100%`  |
| omitscript | `boolean` | Removes the `<script>` part from the response html | `true`, `false` | `true`  |

## Facebook Video

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| width         | `integer`  | Sets the maximum width for the embed               | `100%`, `400px` | `100%`  |
| omitscript | `boolean` | Removes the `<script>` part from the response html | `true`, `false` | `true`  |

## Imgur

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| omitscript | `boolean` | Removes the `<script>` part from the response html | `true`, `false` | `true`  |

## Instagram

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| maxwidth         | `integer`  | Sets the maximum width for the embed (min. 320)              | `400` | `500`  |
| hidecaption | `boolean` | Hides the caption text of the embed | `true`, `false` | `false`  |
| omitscript | `boolean` | Removes the `<script>` part from the response html | `true`, `false` | `true`  |

## CodeSandbox

### Global Options

| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| codemirror | `integer`  | Use CodeMirror editor instead of Monaco (decreases embed size significantly). | `0`, `1` | `0`  |
| editorsize | `integer` | Size in percentage of editor. | `50`, `100` | `50`  |
| eslint | `integer` | Use eslint (increases embed size significantly). | `0`, `1` | `0`  |
| expanddevtools | `integer` | Start with the devtools (console) open. | `0`, `1` | `0`  |
| fontsize | `integer` | Font size of editor in px | `14`, `20` | `14`  |
| forcerefresh | `integer` | Force a full refresh of frame after every edit. | `0`, `1` | `0`  |
| hidenavigation | `integer` | Hide the navigation bar of the preview. | `0`, `1` | `0`  |
| moduleview | `integer` | Evaluate the file that is open in the editor. | `0`, `1` | `0`  |
| previewwindow | `string` | Which preview window to open by default | `console`, `tests`, `browser` | `browser`  |
| runonclick | `integer` | Only load the preview when the user says so. | `0`, `1` | `0`  |
| verticallayout | `integer` | Whether to show the editor and preview vertically. | `0`, `1` | `0`  |
| view | `string` | Which view to open by default | `split`, `editor`, `preview` | `split`  |

### Additional URL Options

You can overwrite all defined global options per embed.
The following options are only available as query parameter.


| Name          | Type      | Description                                        | Allowed Values  | Default |
| ------------- | --------- | -------------------------------------------------- | --------------- | ------- |
| highlights | `integer`  | Which lines to highlight (only works in CodeMirror) | `0`, `1` | `0`  |
| initialpath | `string` | Which url to initially load in address bar | `/`, `/src` | `/`  |
| module | `string` | Which module to open by default. Multiple paths comma separated are allowed, in that case we show them as tabs | path to module (starting with `/`) | `entry path`  |

# Example

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
                    //behind the scenes, we're using path.resolve() to get the absolute path
                    //the example path is based on your project route
                    //like the baseDir from the @gridsome/source-filesystem
                    template: './src/providerTemplates/Youtube.hbs',
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

By default, the plugin does not append or load external assets, you have to add the following resources manually.

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

1. Create a new [github gist](https://gist.github.com/)
2. Add `.json` to the gist url e.g. `https://gist.github.com/<yourgithubname>/<gistid>.json`
3. Search for `stylesheet`
4. Copy the url

## Vimeo

The Vimeo embed requires the following external asset.
This is asset is only required when `responsive` is set to `true`.

```
https://player.vimeo.com/api/player.js
```

## Flickr

By default the `omitscript` is set to `true`. 
This means you have to embed by your own.

URL:

```
https://embedr.flickr.com/assets/client-code.js
```

This is the default flickr script:
```
<script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
```

## Facebook

By default the `omitscript` is set to `true`. 
This means you have to embed by your own.

Example:

```
<script>
(function(d, s, id) { 
	var js, 
	    fjs = d.getElementsByTagName(s)[0]; 
	if (d.getElementById(id)) return; 
	js = d.createElement(s); 
	js.id = id; 
	js.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";  
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
```

## Imgur

By default the `omitscript` is set to `true`. 
This means you have to embed by your own.

URL:

```
//s.imgur.com/min/embed.js
```

This is the default imgur script:
```
<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
```

## Instagram

By default the `omitscript` is set to `true`. 
This means you have to embed by your own.

URL:

```
//www.instagram.com/embed.js
```

This is the default instagram script:

```
<script async src="//www.instagram.com/embed.js" charset="utf-8"></script>
```


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
* https://github.com/garetmckinley

