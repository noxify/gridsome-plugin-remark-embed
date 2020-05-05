const Provider = require('./Provider');
const _ = require('lodash');
const querystring = require('querystring');

class CodeSandbox extends Provider {
    constructor(options) {
        super(options);
        this.regexp = /(?:http(?:s?)):\/\/(?:www\.)?codesandbox\.io\/(?:s|embed)\/([a-zA-Z0-9-]*)/i;
        this.template = __dirname + '/../templates/CodeSandbox.hbs';
        this.idPosition = 1;
        this.options = _.defaults(options, {
            codemirror: 0,
            editorsize: 50,
            eslint: 0,
            expanddevtools: 0,
            fontsize: 14,
            forcerefresh: 0,
            hidenavigation: 0,
            moduleview: 0,
            previewwindow: 'browser',
            runonclick: 1,
            verticallayout: 0,
            view: 'split'
        });
    }

    getUrlOptions(embedLink) {
        const [, qs] = embedLink.split(/[?]/);
        if (qs == null) return this.options;
        const queryParameter = querystring.parse(qs);
        return _.defaults(queryParameter, this.options);
    }

    async getEmbedData(embedLink) {
        const embedOptions = this.getUrlOptions(embedLink);
        const embedId = this.getEmbedId(embedLink);
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://www.codesandbox.io/embed/${embedId}?${params}`

        const template = this.getTemplate();

        return template({
            id: embedId,
            link: apiUrl,
            options: embedOptions
        });
    }
}

module.exports = CodeSandbox;