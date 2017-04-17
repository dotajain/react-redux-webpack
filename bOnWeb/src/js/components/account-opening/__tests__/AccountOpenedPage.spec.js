
jest.unmock('../../../config');
jest.unmock('../../../config/ProductData');
jest.unmock('../../../config/BrandConfig');
jest.unmock('../AccountOpenedPage');
jest.unmock('../../../utils/ProductUtils');
jest.unmock('react-bootstrap-datetimepicker');
jest.unmock('../../common/FeatureWrapper');
jest.unmock('../../common/links/AppLinks');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(
		<AccountOpenedPage
			{...props}
		/>
	);
	return shallowRenderer.getRenderOutput();
};

const AppLinks = require('../../common/links/AppLinks');
const AccountOpenedPage = require('../AccountOpenedPage');
const data = {
	productCode: 'IM136',
	product: {
		productType:{
			name: 'savings',
		},
	},
};
const content = {
	accountOpenedPageTitle: 'test',
	accountOpenedSection1Title: 'test',
	accountOpenedSection1Bullet1: 'test',
	accountOpenedSection1Bullet2: 'test',
	accountOpenedSection1Bullet3: 'test',
	accountOpenedSection1Bullet4: '',
	accountOpenedSection2Title: 'test',
	accountOpenedSection2Bullet1: 'test',
	accountOpenedSection2Bullet2: 'test',
	accountOpenedSection2Bullet3: 'test',
	accountOpenedSection2Bullet4: '',
};

let props = {
	data,
	selectContentBasedOnDowngrade:(key) => {
		return content[key];
	},
	content,
	appData:{},
}


describe('AccountOpenedPage', () => {

	let instance;
	let component;

	beforeEach(() => {

		component = shallowRender(props);

		instance = render(
			<AccountOpenedPage
				{...props}
			/>
		);

	});


	describe('App Links', () => {

		it('should render if we are on a standard B product', () => {
			component = shallowRender(props);
			expect(component).toIncludeJSX(
				<AppLinks feature="app-links" {...props} />
			);
		});

		it('should NOT render if we are on a downgraded/alternative product', () => {
			props.data.isAltProduct = true;
			component = shallowRender(props);
			expect(component).not.toIncludeJSX(
				<AppLinks feature="app-links" {...props} />
			);
		});

	});


	describe('getBulletSections', () => {

		it('returns an item for each data element passed in', () => {
			const result = instance.getBulletSections([
				{
					header: '1',
					bullets: [
						'1.1',
						'1.2',
					],
				},
				{
					header: '2',
					bullets: [
						'2.1',
						'2.2',
					],
				},
			]);
			expect(result.length).toBe(2);
		});

		it('returns an empty list if no items are passed in', () => {
			const result = instance.getBulletSections([]);
			expect(result.length).toBe(0);
		});
	});

	describe('getNotEmptyBullets', () => {

		it('returns an item for each data element passed in', () => {
			const bullets =  [
				'1.1',
				'1.2',
			];
			const result = instance.getNotEmptyBullets(bullets);
			expect(result.length).toBe(2);
		});

		it('returns an item for each data element passed in with text', () => {
			const bullets =  [
				'1.1',
				'1.2',
				'1.3',
				'1.4',
			];
			const result = instance.getNotEmptyBullets(bullets);
			expect(result.length).toBe(3);
		});

		it('returns an empty list if no items are passed in', () => {
			const result = instance.getNotEmptyBullets([]);
			expect(result.length).toBe(0);
		});
	});

});
