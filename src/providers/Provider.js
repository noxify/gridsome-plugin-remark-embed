class Provider {
    constructor() {
        this.regexp = '';
        this.idPosition = 1;
        this.template = null;
        
    }

    isEmbedLink(node) {
        return node.children.length === 1 &&
            node.children[0].type === 'link' &&
            this.regexp.test(node.children[0].url)
    }

    getEmbedId(url) {
        const res = url.match(this.regexp);
        return (res) ? res[this.idPosition] : false;
    }

    getEmbedLinks(tree) {
        const visit = require('unist-util-visit');

        const nodes = [];
        visit(tree, 'paragraph', (node) => {
            if (this.isEmbedLink(node)) {
                nodes.push([node, node.children[0].url])
            }
        })

        return nodes;
    }

    async convertEmbedLinks(links, options) {
        for (let i = 0; i < links.length; i++) {
            const nt = links[i];
            const node = nt[0];
            const embedLink = nt[1];
            try {
                const embedData = await this.getEmbedData(embedLink, options);
                node.type = 'html';
                node.value = embedData;
            } catch (err) {
                console.log(`\nfailed to get data for ${embedLink}\n`, err)
            }
        }
    }

    getEmbedData(embedLink, options) {
        const Handlebars = require('handlebars');

        //powered by https://stackoverflow.com/a/37460266/2769836
        Handlebars.registerHelper('getValue', function (a, b) {
            return a ? a : b;
        });

        const embedTemplate = require(this.template);

        const template = Handlebars.compile(embedTemplate);
        return template({
            id : this.getEmbedId(embedLink),
            link : embedLink,
            options : options
        });


    }
}

module.exports = Provider;