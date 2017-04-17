
/**
    @overview Remove \n
    @module plugins/removeNewLines
    @author Chris Canal
    @requires lodash
 */

var _ = require('lodash');

var options = _.assign({}, global.env.conf.removeNewLines);

var inspector = console.log

exports.defineTags = function(dictionary) {
	if (!options.enabled) return;

	// The current version of classdesc on sets the
	// classdesc to tag.value.  However, to ensure we don't
	// break it if they add new functionality later, we
	// will resuse the original
	var original = dictionary._tags.classdesc;
	var classdesc = _.assign({}, original, {
		onTagged: function(doclet, tag) {
			var newdesc = tag.value.replace(/([^\\n])(\\n)([^\\])/g, '$1 $3')
			inspector(newdesc);
			doclet.classdesc = newdesc
		}
	});

	dictionary.defineTag('classdesc', classdesc);
};

