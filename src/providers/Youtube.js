const Provider = require('./Provider');
const _ = require('lodash');

class Youtube extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(?:https?:)?(?:\/\/)(?:www\.)?(?:(?:youtube(?:-nocookie)?\.com\/(?:(?:(?:watch|embed)(?:\?v=|\/)((?!videoseries)[\w-]{11}))|(?:playlist|embed\/videoseries)\?list=([\w-]{34}))|youtu.be\/([\w-]{11})))[?=&+%\w.-]*/i;
        this.template = __dirname+'/../templates/Youtube.hbs';
        this.idPosition = 1;
        const alignment = options.align || 'auto';
        this.options = _.defaults(options, {
            nocookie: true,
            width: '100%',
            margin: `0 ${alignment}`
        });
    }

    getEmbedId(url) {
        const res = url.match(this.regexp).filter(x => undefined !== x );
        return (res) ? res[this.idPosition] : false;
    }

    isPlayList(embedLink) {
        return embedLink.includes('playlist') || embedLink.includes('videoseries');
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