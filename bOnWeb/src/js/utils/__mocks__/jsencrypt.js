// jscs:disable
/* global jest */

const jsencrypt = jest.genMockFunction().mockReturnThis();

jsencrypt.prototype.encrypt = jest.genMockFunction().mockImplementation(function(){
	return 'abc123def456ghi789jkl';
});

jsencrypt.prototype.setPublicKey = jest.genMockFunction();

module.exports = jsencrypt;
