const Provider = require('./Provider');
const _ = require('lodash');
const path = require('path');
const querystring = require('querystring');

class JSFiddle extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(http(s)?:)?\/\/(jsfiddle\.net\/.*)/i;
        this.template = __dirname + '/../templates/JSFiddle.hbs';
        this.idPosition = 3;
        this.options = _.defaults(options, {
            secureConnection: false,
            iframe: true,
            width: '100%',
            height: '300',
            tabs: ['js', 'html', 'css', 'result'],
            theme: 'light'
        });
        this.options.embedUrlPart = (this.options.iframe) ? 'embedded' : 'embed';
    }

    /**
     * Builds the  url.
     * @param {string} value the value of the block.
     * @returns {string} the url without the query string.
     */
    buildUrl(embedLink) {
        return embedLink.split(/[?]/)[0];
    }

    /**
     * Builds the query object.
     * This methods looks for anything that is after ? 
     * ? is interpreted as a query string.
     * 
     * @param {string} value the value of the block.
     * @returns {object} the query object.
     */
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

    getWidgetLink(embedLink) {

        const url = this.buildUrl(this.getEmbedId(embedLink));
        let userTabs = this.getUserTabs(embedLink);
        this.options.tabs = (userTabs.length > 0) ? userTabs : this.options.tabs;

        let embedUrl = path.join.apply(null, [
            url,
            this.options.embedUrlPart,
            this.options.tabs.join(','),
            (this.options.theme != 'light') ? this.options.theme : '',
        ]);

        return embedUrl;
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

module.exports = JSFiddle;