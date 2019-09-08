const Provider = require('./Provider');
const _ = require('lodash');

class Soundcloud extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(http(s)?:\/\/.)?(www|api\.)?soundcloud\.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        this.template = __dirname + '/../templates/Soundcloud.hbs';
        this.idPosition = 4;
        this.options = _.defaults(options, {
            color: '#ff5500',
            auto_play: false,
            hide_related: false,
            show_comments: true,
            show_user: true,
            show_reposts: false,
            show_teaser: true,
            visual: true
        });
    }

    getWidgetLink(embedLink) {
        this.options['url'] = embedLink;
        const urlOptions = querystring.stringify(this.options);
        return querystring.encode(urlOptions);
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();

        return template({
            id: this.getEmbedId(embedLink),
            link: embedLink,
            embedData: '',
            widgetLink: this.getWidgetLink(embedLink),
            options: this.options
        });
    }
}

module.exports = Soundcloud;