const Provider = require('./Provider');

class Youtube extends Provider {
    constructor() {
        super();
        this.regexp = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/\S*?[^\w\s-])((?!videoseries)[\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;
        this.template = __dirname+'/../templates/Youtube.hbs';
        this.idPosition = 1;
    }
}

module.exports = Youtube;