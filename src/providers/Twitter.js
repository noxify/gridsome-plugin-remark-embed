const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class Twitter extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /https:\/\/twitter.com\/.*\/.*\/([0-9]+)/i;
        this.idPosition = 1;
        this.template = __dirname + '/../templates/Twitter.hbs';
        this.options = _.defaults(options, {
            hideConversation: false,
            hideMedia: false,
            align: 'none',
            theme: 'light',
            linkColor: '',
            widgetType: '',
            dnt: true,
            omitScript: true
        });
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink,
            hide_thread: this.options.hideConversation !== false ? '1' : '0',
            align: this.options.align || '',
            hide_media: this.options.hideMedia !== false ? '1' : '0',
            theme: this.options.theme || '',
            link_color: this.options.linkColor || '',
            widget_type: this.options.widgetType || '',
            omit_script: this.options.omitScript !== false ? '1' : '0',
            dnt: this.options.dnt,
            limit: 20,
            chrome: 'nofooter'
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://publish.twitter.com/oembed?${params}`

        const response = await fetch(apiUrl)
        const embedData = await response.json()
        
        const template = this.getTemplate();

        return template({
            id: this.getEmbedId(embedLink),
            link: embedLink,
            embedData: embedData.html,
            options: this.options
        });
    }
}

module.exports = Twitter;