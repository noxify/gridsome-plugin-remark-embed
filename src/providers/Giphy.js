const Provider = require('./Provider');
const _ = require('lodash');

class Giphy extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /https?:\/\/(?:\?|media\.giphy\.com\/media\/([^ /\n]+)\/giphy\.gif|i\.giphy\.com\/(?:[^ /\n]+)\.gif|giphy\.com\/gifs\/(?:.*-)?([^ /\n]+))/i;
        this.template = __dirname + '/../templates/Giphy.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            responsive: true
        });
    }

    getEmbedId(url) {
        const res = url.match(this.regexp);
        if(!res) return false;
        const regExpPosition = (!res[this.idPosition]) ? 2 : this.idPosition
        return res[regExpPosition];
    }
}

module.exports = Giphy;