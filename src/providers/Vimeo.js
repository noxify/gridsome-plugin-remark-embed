const Provider = require('./Provider');
const _ = require('lodash');

class Vimeo extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(?:(?:http|https):\/\/)?(?:www\.)?vimeo\.com(?:\/groups\/.*|\/m\/#)?\/([0-9]{9})/i;
        this.template = __dirname + '/../templates/Vimeo.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            responsive: false,
            loop: false,
            autoplay: false,
            width: '640',
            height: '360',
        });
    }
}

module.exports = Vimeo;