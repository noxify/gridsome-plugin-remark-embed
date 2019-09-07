const Provider = require('./Provider');
const _ = require('lodash');

class Youtube extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/\S*?[^\w\s-])((?!videoseries)[\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;
        this.template = __dirname+'/../templates/Youtube.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            nocookie: true,
            width: '100%',
            align: 'auto'
        });
    }
}

module.exports = Youtube;