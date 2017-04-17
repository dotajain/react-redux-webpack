window.envConfig = {
	apiBaseUrl: 'https://my-test.cybservices.co.uk/bpiSITB',
	bankId: 'YB',
	callValidate3DTimelimit: 300000,
	disableAnalytics: false,
	trackingId: 'f3b083deb956a224b0bc2c7545973fbf9e53a7be',
	disableNavigationWarning: false,
	enableWindowStubs: false,
	requireMobileNumber: true,
	stubApiData: false,
	targetScope: {
		unknown: -1,
		notAuthed: 0,
		authentication: 30,
		login: 20,
	},
	websiteBaseDirectory: '/sitb/',

	// Timers
	autoLoginTimeout: 35000,			// How long after registering a user for the first time should we wait before logging them in?
	nextTaskCheckInterval: 5000,		// How often should a loading page call getNextTask after the last call?
	defaultAutoSaveInterval: 600000,		// How often should the form be automatically saved for a user?
	shortAutoSaveInterval: 600000,		// After an error occurs, how long before we try an autosave again?
	publicKeyExpiry: 29000,				// How long do public keys from RAM last before becoming invalid?
	tokenInactivityTimeout: 1500000,	// How long to wait after a user's last action before expiring their session?
};

