const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const visit = require('unist-util-visit');

const loadProviders = (options) => {

    let providers = {};

    const selectedProviders = _.without(options.enabledProviders, 'Provider');
    _.each(selectedProviders, function (providerName) {
        providers[providerName] = require('./providers/' + providerName);
    });

    return providers;
}

module.exports = function (options) {

    return async function transform(tree) {

        const embedLinks = []

        visit(tree, 'paragraph', node => embedLinks.push(node))

        const loadedProviders = loadProviders({
            'enabledProviders': options.enabledProviders || []
        });

        for (const node of embedLinks) {
            let embedData;

            try {
                for (const providerName in loadedProviders) {
                    const providerOptions = options[providerName] || {};
                    let Provider = new loadedProviders[providerName](providerOptions);
                    if (Provider.isEmbedLink(node)) {
                        const embedLink = Provider.getEmbedLink(node);
                        embedData = await Provider.getEmbedData(embedLink);
                        break;
                    }
                };
            } catch (err) {
                console.log(err);
            }

            if (embedData) {
                node.type = 'html'
                node.value = embedData
            }
        }
    }
}
