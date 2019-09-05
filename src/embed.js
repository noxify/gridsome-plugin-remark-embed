const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const loadProviders = (options) => {

    let providers = {};

    const selectedProviders = _.without(options.enabledProviders, 'Provider');
    _.each(selectedProviders, function (providerName) {
        providers[providerName] = require('./providers/' + providerName);
    });

    return providers;
}

module.exports = (options) => {

    const loadedProviders = loadProviders({
        'enabledProviders': ['Twitter', 'Youtube']
    });

    return async tree => {

        _.each(loadedProviders, function(providerClass) {
            var Provider = new providerClass();
            await Provider.convertEmbedLinks(tree, options);
        });
    }
}