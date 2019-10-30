const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class FacebookVideo extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /((http(s)?:)?\/\/(www.)?)(facebook\.com)\/((.*)\/(videos)\/|(video\.php\?id=|video\.php\?v=))(.*)/i;
        this.idPosition = 1;
        this.template = __dirname + '/../templates/FacebookVideo.hbs';
        this.options = _.defaults(options, {
            maxwidth: '100%',
            omitscript: true
        });
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink,
            maxwidth: this.options.width || '',
            omitscript: this.options.omitscript || '',
            format: 'json'
            
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://www.facebook.com/plugins/video/oembed.json/?${params}`

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

module.exports = FacebookVideo;