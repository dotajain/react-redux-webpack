const hooks = function () {
	this.After(function (scenario, callback = () => {}) {
		this.takeScreenshot(`${scenario.getName()} End`, scenario.isFailed() ? 'failed/' : '')
			.then(() => this.end(callback));
	});
};

module.exports = hooks;

