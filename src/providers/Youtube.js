const Provider = require('./Provider');
const _ = require('lodash');

class Youtube extends Provider {
    constructor(options) {
        super(options);
        //this.regexp = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/\S*?[^\w\s-])((?!videoseries)[\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;
        this.regexp = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube(?:-nocookie)?\.com(?:\/(?:embed\/|watch\/|(?:playlist\?(?:list=))|(?:watch\?(?:v=))))?)|(?:youtu\.be\/?))(.*)/i;
        this.template = __dirname+'/../templates/Youtube.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            nocookie: true,
            width: '100%',
            align: 'auto'
        });
    }

    isPlayList(embedLink) {
        return embedLink.indexOf('playlist') !== -1;
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();

        return template({
            id: this.getEmbedId(embedLink),
            link: embedLink,
            playlist: this.isPlayList(embedLink),
            embedData: '',
            options: this.options
        });
    }
}

module.exports = Youtube;