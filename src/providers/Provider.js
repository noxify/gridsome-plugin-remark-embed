const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class Provider {
    constructor(options) {
        this.regexp = '';
        this.idPosition = 1;
        this.template = null;
        this.options = options;
    }

    isEmbedLink(node) {
        return node.children.length === 1 &&
            node.children[0].type === 'link' &&
            this.regexp.test(node.children[0].url)
    }

    getEmbedLink(node) {
        return node.children[0].url;
    }

    getEmbedId(url) {
        const res = url.match(this.regexp);
        return (res) ? res[this.idPosition] : false;
    }

    getTemplateEngine() {
        const Handlebars = require('handlebars');

        //powered by https://stackoverflow.com/a/37460266/2769836
        Handlebars.registerHelper('getValue', function (a, b) {
            return a ? a : b;
        });

        return Handlebars;
    }

    getTemplate() {
        const embedTemplate = fs.readFileSync(path.resolve(this.template), 'utf8')
        const template = this.getTemplateEngine().compile(embedTemplate);
        return template;
    }

    setCustomTemplate(template) {
        this.template = path.resolve(template);
        return this;
    }

    async getEmbedData(embedLink) {

        const template = this.getTemplate();

        return template({
            id: this.getEmbedId(embedLink),
            link: embedLink,
            embedData: '',
            options: this.options
        });
    }
}

module.exports = Provider;