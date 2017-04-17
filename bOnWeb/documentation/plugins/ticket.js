
/**
    @overview @ticket support
	@module plugins/ticket
    @author Chris Canal
 */

exports.defineTags = function(dictionary) {
	dictionary.defineTag('ticket', {
		onTagged: function(doclet, tag) {
			doclet.tickets = doclet.tickets || [];
            doclet.tickets.push(tag.value);
		}
	});
};

