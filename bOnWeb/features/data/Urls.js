
let baseUrl = 'http://localhost:9101';

if (process.env.TEST_ENV_URL) {
	baseUrl = process.env.TEST_ENV_URL;
}

const Urls = {
	landingPage: (applyFor, stub) => {
		return `/account-opening?applyFor=${applyFor}${stub && '&stub=' + stub}`;
	},
	personalDetails: (applyFor, stub) => {
		return `/account-opening/step-1?applyFor=${applyFor}${stub && '&stub=' + stub}`;
	},
	build: url => [baseUrl, url].join('')
}

export default Urls;
