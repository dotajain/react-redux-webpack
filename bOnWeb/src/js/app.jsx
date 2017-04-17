const startAnalytics = () => {
	if (window._satellite) {
		window._satellite.pageBottom();
	} else {
		setTimeout(startAnalytics, 50);
	}
};

const attachAms = config => {
	if (!config.trackingId) {
		return;
	}

	const adobedtm = `//assets.adobedtm.com/6677ad16b0484ad2b930d0b209e41c1e96798d52/satelliteLib-${config.trackingId}.js`;

	const head = document.getElementsByTagName('head')[0];
	const scriptEle = document.createElement('script');
	scriptEle.src = adobedtm;
	head.appendChild(scriptEle);

	setTimeout(startAnalytics, 50);
};

// Kick off app via routing, when config + content are loaded.
const startApp = () => {
	const envConfig = require('../static/config');
	if (envConfig && envConfig.content) {
		const AppRouter = require('./router/AppRouter.jsx');
		AppRouter.init();
		attachAms(envConfig);
	} else {
		setTimeout(startApp, 50);
	}
};

setTimeout(startApp, 50);
