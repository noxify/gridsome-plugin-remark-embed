const Provider = require('./Provider');
const _ = require('lodash');

class Giphy extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /https?:\/\/(\?|media\.giphy\.com\/media\/([^ /\n]+)\/giphy\.gif|i\.giphy\.com\/([^ /\n]+)\.gif|giphy\.com\/gifs\/(?:.*-)?([^ /\n]+))/i;
        this.template = __dirname + '/../templates/Giphy.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            responsive: true
        });
    }
}

module.exports = Giphy;