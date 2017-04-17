function pad(n) { return n < 10 ? '0'+n : n; }
function padThree(n) { return n < 10 ? '00'+n : n < 100 ? '0'+n : n; }

function ISODateString(d) {
        return d.getUTCFullYear() + '-' +
            pad(d.getUTCMonth()+1) + '-' +
            pad(d.getUTCDate()) + 'T' +
            pad(d.getUTCHours()) + ':' +
            pad(d.getUTCMinutes()) + ':' +
            pad(d.getUTCSeconds()) + '.' +
            // TeamCity wants ss.SSS
            padThree(d.getUTCMilliseconds());
    }

var myAroundHooks = function () {
	this.Around(function (scenario, runScenario) {
		console.log(`##teamcity[testSuiteStarted name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
		console.log(`##teamcity[testStarted name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
		runScenario(null, function () {
			if (scenario.isFailed()) {
				console.log(`##teamcity[testFailed name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
			} else if (scenario.isPending()) {
				console.log(`##teamcity[testIgnored name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
			}
			console.log(`##teamcity[testFinished name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
			console.log(`##teamcity[testSuiteFinished name='${scenario.getName()}' timestamp='${ISODateString(new Date())}']`);
		});
	});
};

module.exports = myAroundHooks;



