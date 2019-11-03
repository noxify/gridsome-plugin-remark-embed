const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class Imgur extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /^https?:\/\/(?:www\.)?(?:i\.)?imgur\.com\/(gallery\/|t\/(.*)\/)?([a-zA-Z0-9]*)(\.jpg)?/i;
        this.idPosition = 1;
        this.template = __dirname + '/../templates/Imgur.hbs';
        this.options = _.defaults(options, {
            excludeScript: true
        });
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://api.imgur.com/oembed.json?${params}`

        const response = await fetch(apiUrl)
        const embedData = await response.json()
        
        const embedHtml = embedData.html;

        if (this.options.excludeScript) {
            const htmlRegExp = /(.*)(<script.*<\/script>)/i;

            if ((stripedHtml = htmlRegExp.exec(embedData.html)) !== null) {
                embedHtml = stripedHtml[1];
            }
        }
        
        const template = this.getTemplate();

        return template({
            link: embedLink,
            embedData: embedData.html,
            html: embedHtml,
            options: this.options
        });
    }
}

module.exports = Imgur;