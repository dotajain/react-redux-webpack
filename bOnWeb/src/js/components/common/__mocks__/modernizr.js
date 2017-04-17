// jscs:disable
/* global jest */

const modernizr = jest.genMockFunction().mockReturnThis();

// TODO: At the moment this is empty. We should probably fix this later.

modernizr.prototype.touch = jest.genMockFunction().mockImplementation(function(){
	return false;
});

module.exports = modernizr;
