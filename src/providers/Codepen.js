const Provider = require('./Provider');
const _ = require('lodash');
const path = require('path');
const querystring = require('querystring');

class Codepen extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /https:\/\/(www\.)?codepen\.io\/(([A-Za-z0-9-_?=]*)\/pen\/([A-Za-z0-9-_=]*))(\?.*)?/i;
        this.template = __dirname + '/../templates/Codepen.hbs';
        this.idPosition = 4;
        this.options = _.defaults(options, {
            iframe: false,
            height: '265',
            theme: '0',
            preview: true,
            tabs: ['result']
        });
    }

    getPenUser(url) {
        const res = url.match(this.regexp);
        return (res) ? res[3] : false;
    }

    getUserTabs(embedLink) {
        const [, qs] = embedLink.split(/[?]/);

        if (qs == null) return [];

        const query = querystring.parse(qs);

        let tabs = [];
        if (typeof query.tabs === "string") {
            tabs = query.tabs.split(',');
        } else if (Array.isArray(query.tabs)) {
            tabs = query.tabs;
        }

        return tabs;
    }

    getFrameUrl(penId, penUser, tabs) {

        let embedUrl = path.join.apply(null, [
            penUser,
            'embed',
            (this.options.preview) ? 'preview' : '',
            penId
        ]);

        const embedQuery = querystring.stringify({
            height: this.options.height,
            'theme-id': this.options.theme,
            'default-tab': this.options.tabs.join(',')
  
        });

        return embedUrl+'/?'+embedQuery;
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();
        const penId = this.getEmbedId(embedLink);
        const penUser = this.getPenUser(embedLink);
        const userTabs = this.getUserTabs(embedLink);
        const tabs = (userTabs.length > 0) ? userTabs : this.options.tabs;

        const frameUrl = this.getFrameUrl(penId, penUser, tabs);

        return template({
            id: this.getEmbedId(embedLink),
            penUser: this.getPenUser(embedLink),
            link: embedLink,
            tabs : tabs,
            embedData: '',
            frameUrl: frameUrl,
            options: this.options
        });
    }


}

module.exports = Codepen;