/**
    @overview Adds description is one does not exist.
    @module plugins/description
    @author Chris Canal
 */

exports.handlers = {
    newDoclet: function(e) {
        if (!e.doclet.description) {
            e.doclet.description = ' ';
        }
    }
}
