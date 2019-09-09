const Provider = require('./Provider');
const _ = require('lodash');
const querystring = require('querystring');

class Soundcloud extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(http(s)?:\/\/.)?(www|api\.)?soundcloud\.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        this.template = __dirname + '/../templates/Soundcloud.hbs';
        this.idPosition = 4;
        this.options = _.defaults(options, {
            width: '100%',
            height: '81',
            color: '#ff5500',
            auto_play: false,
            hide_related: false,
            show_comments: true,
            show_user: true,
            show_reposts: false,
            show_teaser: true,
            visual: true,
            single_active: true
        });
    }

    getCustomHeight(embedLink) {
        const [, qs] = embedLink.split(/[?]/);

        if (qs == null) return [];

        const query = querystring.parse(qs);

        let height = this.options.height;
        if (typeof query.height === "string") {
            height = query.height;
        }

        return height;
    }

    getWidgetLink(embedLink) {
        this.options.height = this.getCustomHeight(embedLink);
        this.options['url'] = embedLink;
        return querystring.stringify(this.options);
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