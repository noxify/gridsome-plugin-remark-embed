const Provider = require('./Provider');

class Gist extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /https:\/\/gist.github.com\/(.*)\/([a-f0-9]+)/i;
        this.idPosition = 2;
        this.template = __dirname + '/../templates/Gist.hbs';
        this.options = _.defaults({
            nocookie: true,
            width: '100%',
            align: 'auto'
        }, options);
    }
}

module.exports = Gist;