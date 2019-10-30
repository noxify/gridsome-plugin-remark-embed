const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class Twitter extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /((http(s)?:)?\/\/(www.)?)((flickr\.com\/photos)|flic\.kr\/p)/i;
        this.idPosition = 1;
        this.template = __dirname + '/../templates/Flickr.hbs';
        this.options = _.defaults(options, {
            maxwidth: '1024',
            maxheight: '768'
        });
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink,
            excludeScript: true,
            maxwidth: this.options.width || '',
            maxheight: this.options.height || '',
            format: 'json'
            
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://www.flickr.com/services/oembed?${params}`

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

module.exports = Twitter;