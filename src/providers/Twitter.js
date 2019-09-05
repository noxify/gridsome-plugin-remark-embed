const Provider = require('./Provider');
const fetch = require('node-fetch');

class Twitter extends Provider {
    constructor() {
        super()
        this.regexp = /https:\/\/twitter.com\/.*\/.*\/([0-9]+)/i;
        this.idPosition = 1;
    }

    async getEmbedData(embedLink, options) {
        const embedOptions = {
            url: embedLink,
            hide_thread: options.hideThread !== false ? '1' : '0',
            align: options.align || '',
            hide_media: options.hideMedia ? '1' : '0',
            theme: options.theme || '',
            link_color: options.linkColor || '',
            widget_type: options.widgetType || '',
            omit_script: true,
            dnt: true,
            limit: 20,
            chrome: 'nofooter'
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://publish.twitter.com/oembed?${params}`

        const response = await fetch(apiUrl)
        const embedData = await response.json()
        return embedData.html
    }
}

module.exports = Twitter;