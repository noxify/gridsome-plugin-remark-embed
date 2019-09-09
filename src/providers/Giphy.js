const Provider = require('./Provider');
const _ = require('lodash');

class Giphy extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube(?:-nocookie)?\.com(?:\/(?:embed\/|watch\/|(?:playlist\?(?:list=))|(?:watch\?(?:v=))))?)|(?:youtu\.be\/?))(.*)/i;
        this.template = __dirname + '/../templates/Giphy.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            responsive: true
        });
    }
}

module.exports = Giphy;