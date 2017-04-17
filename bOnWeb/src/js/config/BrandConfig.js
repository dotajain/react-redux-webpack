const productData = require('./ProductData');

const brandConfig = {
	CB: {
		productData: {
			IM135: productData.IM135,
			IM125: productData.IM125,
			IM800: productData.IM800,

			IM803: productData.IM803,
			IM340: productData.IM340,
			IM360: productData.IM360,
		},
	},

	YB: {
		productData: {
			IM135: productData.IM135,
			IM125: productData.IM125,
			IM800: productData.IM800,

			IM340: productData.IM340,
			IM145: productData.IM145,
			IM110: productData.IM110,
		},
	},

	DYB: {
		productData: {
			IM136: productData.IM136,
			IM800: productData.IM800,
		},
	},
	getProductsFor: bankId => {
		return brandConfig[bankId.toUpperCase()].productData;
	},
};

module.exports = {
	brandConfig,
};
