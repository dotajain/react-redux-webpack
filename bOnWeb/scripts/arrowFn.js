module.exports = (file, api, options) => {
    const j = api.jscodeshift;

    const root = j(file.source);

    const createArrowFunctionExpression = fn => {
        return j.arrowFunctionExpression(
            fn.params,
            fn.body,
            false);
    };

    root
        .find(j.FunctionExpression)
        .filter(path => (
            !path.value.id
        ))
        .forEach(path => {
            if (path.parentPath.name === "callee" && path.parentPath.value.property) {
                return null;
            }
            if (path.parentPath.type === "ExpressionStatement"
                && path.parentPath.value.left
            && path.parentPath.value.left.object.property
            && path.parentPath.value.left.object.property.name == "prototype") {
                return null;
            }
            if (path.parentPath.value.type === "Property"
                && path.parentPath.parentPath.name === "properties") {
                    return null;
                }
                return j(path).replaceWith(
                    createArrowFunctionExpression(path.value)
                )
        });

    return root.toSource();
};