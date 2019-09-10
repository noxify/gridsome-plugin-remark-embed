const Provider = require('./Provider');
const _ = require('lodash');

class Spotify extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /^https:\/\/open\.spotify\.com\/(user\/[A-Za-z0-9-_]*\/playlist|track|artist|album)\/([A-Za-z0-9-_?=]+)/i;
        this.template = __dirname + '/../templates/Spotify.hbs';
        this.idPosition = 2;
        this.options = _.defaults(options, {
            width:'100%',
            height:'400'
        });
    }

    getType(embedLink) {
        const res = embedLink.match(this.regexp);
        return (res) ? res[1] : false;
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();

        return template({
            id: this.getEmbedId(embedLink),
            type: this.getType(embedLink),
            link: embedLink,
            embedData: '',
            options: this.options
        });
    }

}

module.exports = Spotify;