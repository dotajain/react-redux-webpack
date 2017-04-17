// converts commonJS requires to es6 imports
//   var foo = require('foo');
// ->
//   import foo from 'foo';
//
// jscodeshift -t scripts/requiresToImports.js src/js/**/(^[_|vendor]*)/*.{js,jsx}
'use strict';

module.exports = function(fileInfo, api) {
	var j = api.jscodeshift;
	var root = j(fileInfo.source);

	root
		.find(j.VariableDeclaration, {
			declarations: [{
				type: 'VariableDeclarator',
				init: {
					type: 'CallExpression',
					callee: {
						type: 'Identifier',
						name: 'require',
					},
				},
			}],
		})
		.filter(isTopLevel)
		.forEach(function(path) {
			const dec = path.value.declarations[0];
			const id = dec.id;
			const source = dec.init.arguments[0];
			const comments = path.value.comments;
			const loc = path.value.loc;

			path.replace(
				j.importDeclaration(
					[{
						type: 'ImportDefaultSpecifier',
						id
					}],
					source
				)
			);
			path.value.loc = loc;
			path.value.comments = comments;
		});

	root
		.find(j.VariableDeclaration, {
			declarations: [{
				type: 'VariableDeclarator',
				init: {
					type: 'MemberExpression',
					object: {
						type: 'CallExpression',
						callee: {
							type: 'Identifier',
							name: 'require'
						},
					},
				},
			}],
		})
		.filter(isTopLevel)
		.forEach(function(path) {
			const dec = path.value.declarations[0];
			const name = dec.id;
			const source = dec.init.object.arguments[0];
			const id = dec.init.property;
			const comments = path.value.comments;
			const loc = path.value.loc;

			let spec = {
				type: 'ImportSpecifier',
				id,
			}
			if (name.name !== id.name) {
				spec['name'] = name;
			}

			path.replace(j.importDeclaration([spec], source));
			path.value.loc = loc;
			path.value.comments = comments;
		});

	return root.toSource();
};

function isTopLevel(path) {
	return !path.parentPath.parentPath.parentPath.parentPath;
}
