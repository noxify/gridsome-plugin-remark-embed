const Provider = require("./Provider");
const _ = require("lodash");

/*
 * Make sure to add 
 * <script async src="//www.instagram.com/embed.js"></script>
 * in <head>.
 * 
 * I.e.
 *
 * metaInfo() {
    return {
      ...
      script: [
        { src: 'https://www.instagram.com/embed.js', async: true, body: true, }
      ]
    };
  },
 */

class Instagram extends Provider {
  constructor(options) {
    super(options);
    this.regexp = /(?:(?:http|https):\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/(?:p|tv)\/([a-z0-9-]{11})\/?/i;
    this.template = __dirname + "/../templates/Instagram.hbs";
    this.idPosition = 1;
    this.options = _.defaults(options, {
      label: "View this post on Instagram",
    });
  }
}

module.exports = Instagram;
