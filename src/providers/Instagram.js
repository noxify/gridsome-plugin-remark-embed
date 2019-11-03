const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class Instagram extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/p\/([A-Za-z0-9-_]+)/i;
        this.idPosition = 1;
        this.template = __dirname + '/../templates/Instagram.hbs';
        this.options = _.defaults(options, {
            maxwidth: '500',
            omitscript: true,
            hidecaption:false,
        });
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink,
            maxwidth: this.options.maxwidth,
            omitscript: this.options.omitscript,
            hidecaption: this.options.hidecaption
            
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://api.instagram.com/oembed?${params}`

        const response = await fetch(apiUrl)
        const embedData = await response.json()
        
        
        const template = this.getTemplate();

        return template({
            link: embedLink,
            embedData: embedData.html,
            options: this.options
        });
    }
}

module.exports = Instagram;