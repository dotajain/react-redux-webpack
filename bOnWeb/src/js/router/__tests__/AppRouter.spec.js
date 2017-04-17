window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

jest.unmock('../AppRouter');

const AppRouter = require('../AppRouter');
const { brandConfig } = require('../../config/BrandConfig');


describe('AppRouter', () => {
	
	beforeEach(() => {
		brandConfig.getProductsFor.mockReturnValue({
			IM136: 'IM136',
			IM800: 'IM800',
		});
	});

	describe('when redirect from / to account-opening', () => {
		it('should get first product code name from the current brand', () => {
			const query = AppRouter.getQuery();
			expect(query.applyFor).toBe('IM136');
		});
	});
});
	