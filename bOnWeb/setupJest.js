require('jasmine-expect-jsx');

if (process.env.TEAMCITY_CAPTURE_ENV) {
	jasmine.VERBOSE = true;

	var jasmineReporters = require('jasmine-reporters');
	var reporter = new jasmineReporters.TeamCityReporter();
	jasmine.getEnv().addReporter(reporter);
}

