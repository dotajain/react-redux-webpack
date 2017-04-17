'use strict';

const AccountListComponent = jest.genMockFromModule('../AccountListComponent');

function render() {
return "<div>AccountList</div>";
}

AccountListComponent.render = render;

module.exports = AccountListComponent;
