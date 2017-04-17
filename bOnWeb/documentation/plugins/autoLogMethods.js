/**
    @overview Adds function epxressions is one does not exist.
    @module plugins/autoLogMethods
    @author Chris Canal
    @requires lodash
 */

var _ = require('lodash');

var options = _.assign({}, global.env.conf.autoLogMethods);

var inspector = console.log

exports.handlers = {
    newDoclet: function(e) {
    	if (!options.enabled) {
    		return;
    	}

        options.debug && inspector(e);

    	if(e.doclet.undocumented && e.doclet.meta.code.type === 'FunctionExpression') {
    		e.doclet.undocumented = false;
            e.doclet.description = "Automatically generated."
		}
    }
}
