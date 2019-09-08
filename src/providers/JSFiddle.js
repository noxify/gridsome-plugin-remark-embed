const Provider = require('./Provider');
const _ = require('lodash');
const querystring = require('querystring');

class JSFiddle extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(http(s)?:)?\/\/(jsfiddle\.net\/.*)/i;
        this.template = __dirname + '/../templates/JSFiddle.hbs';
        this.idPosition = 3;
        this.options = _.defaults(options, {
            iframe: false,
            width: '100%',
            height: '300',
            tabs: ['js', 'html', 'css', 'result'],
            theme: 'light',
            fontColor: null,
            accentColor: null,
            bodyColor: null,
            menuColor: null
        });
        this.options['embedUrlPart'] = (this.options.iframe) ? 'embedded' : 'embed';
    }

    getWidgetLink(embedLink) {
        this.options['url'] = embedLink;
        return querystring.encode(querystring.stringify(this.options));
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();

        console.log(querystring.parse(this.getEmbedId(embedLink)));

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