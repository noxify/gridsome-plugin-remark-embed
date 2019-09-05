const visit = require('unist-util-visit');
const _ = require('lodash');

import * as Providers from 'providers';

//https://regex101.com/library/OY96XI
const embedRegexp = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/\S*?[^\w\s-])((?!videoseries)[\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;

const isEmbedLink = node => {
	return node.children.length === 1 
	&& node.children[0].type === 'link' 
	&& embedRegexp.test(node.children[0].url)
}

const getEmbedId = (url) => {
	var res = url.match(embedRegexp);
	return (res) ? res[1] : false;
}

const getDefaultConfig = () => {
	return {
		nocookie : true,
		width : '100%',
		align : '0'
	};
}

const getEmbedData = async (url, opt) => {
	const embedOptions = {
		nocookie: opt.nocookie ? '-nocookie' : '',
	}

	const embedId = getEmbedId(url);
	
	if (embedId) {
		return `<div style="width: ${opt.width || '100%'}; margin: 0 ${opt.align || '0'};">
				<div style="position: relative; padding-bottom: 56.25%; padding-top: 25px; height: 0;">
					<iframe 
						style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
						src="https://www.youtube${embedOptions.nocookie}.com/embed/${embedId}" 
						allow="autoplay; encrypted-media"
						allowfullscreen >
					</iframe>
			</div>
			</div>
		`;
	}

	throw 'no embed id found';
}

module.exports = (options) => {
	const debug = options.debug ? console.log : () => {}

	return async tree => {

		const nodes = [];
		visit(tree, 'paragraph', (node) => {
			if (isEmbedLink(node)) {
				debug(`\nfound embed link`, node.children[0].url)
				nodes.push([node, node.children[0].url])
			}
		})

		for (let i = 0; i < nodes.length; i++) {
			const nt = nodes[i];
			const node = nt[0];
			const embedLink = nt[1];
			debug(`\nEmbed: ${embedLink}`);
			try {
				const embedData = await getEmbedData(embedLink, options);
				node.type = 'html';
				node.value = embedData;
			} catch (err) {
				debug(`\nfailed to get data for ${embedLink}\n`, err)
			}
		}

	}
}