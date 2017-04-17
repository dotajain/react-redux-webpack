jest.unmock('../PotDetailMessages');
const React = require('react');
const moment = require('moment');
const TestUtils = require('react-addons-test-utils');
const NumberUtils = require('../../../utils/NumberUtils');

const PotDetailMessages = require('../PotDetailMessages');
let component;
	let props;
	let content = {
              	potMessageHead1:'Goal!',
				potMessage1Part:'Congratulations you\'ve hit your target of',
				potMessageHead2:'Hmmm',
				potMessage2Part1:' Put away',
				potMessage2Part2:' every month and you won\'t hit',
				potMessage2Part3:' unless you happen to have a time machine handy.',
				potMessage2Part4:' Do you want to crank things up a bit?',
				potMessageHead3:'It\'s going great',
				potMessage3Part1:' To stay on track put away',
				potMessage3Part2:' this month and every` month \'til your target date of ',
				potMessage3Part3:' and you\'ll save',
				potMessage3Part4:' Congrats.',
				potMessageHead4:'Happy to Wait?',
				potMessage4Part2:' this month, and you won\'t hit your target of ',
				potMessage4Part3:'until',
				potMessage4Part4:' If that\'s OK, great. If not, you might want to bring it forward to',
				potMessage4Part5:' by upping your monthly amount to',
				potMessageHead5:'You\'ve got wiggle room',
		        potMessage5Part2:' a month and you\'ll have',
				potMessage5Part3:' by your target date of',
				potMessage5Part4:' Though you can reduce your monthly amount to',
				potMessage5Part5:' and you will still hit your target by',
				potMessageHead6:'Keep going',
				potMessage6Part1:' Its All According to plan',
				potMessageHead7:'Think of a goal - large or small',
				potMessage7Part1:' How much would you need to put into a Savings Pot to make it happen?',
				potMessage8Part2:'a month and you are unlikely to hit',
				potMessage8Part3:'You might want to crank things up a bit.',
				potMessageHead8:'That\'s Spot On',
				potMessage7Part2:'a month and you\'ll save',
				potMessage7Part3:'Happy Days.',
				potMessage7Part4:'It might take a while',
				potMessage7Part5:'a month, and you will have',
				potMessage7Part6:'You\'ll Smash it',
				potMessage7Part7:'and you\'ll have',
				potMessage8Part1:'if you want to take things a bit easier and do it by',
				potMessage1:' You will meet your goal instantly.',
              };
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<PotDetailMessages
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('PotDetailMessages Test Cases check', () => {	
		beforeEach(() => {
		});

		it("PotDetailMessages : Unit Test Case 1 : toBeDefined",()=>{
		props = {
			isChanged : true,
			amountvalue: 0, 
              goal:1234,
              goalwhen:'2016-08',
              balance:234,
              content : {content},
              
		}
		component = shallowRender(props);
         expect(component).toBeDefined();
		});

		it("PotDetailMessages : Unit Test Case 2 : Goal! ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 0,
              goal:1234,
              goalwhen : '2017-09',
              balance:1234,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1234);
		});

	it("PotDetailMessages : Unit Test Case 3 : Goal! ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 0,
              goal:1000,
              goalwhen : moment().add(3, 'months').format('YYYY-MM'),
              balance:1234,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});

	it("PotDetailMessages : Unit Test Case 5 : It might take a while",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 200,
              goal:1000,
              goalwhen : moment().add(3, 'months').format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});

	it("PotDetailMessages : Unit Test Case 6 : Way to go",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 270,
              goal:1000,
              goalwhen : moment().add(3, 'months').format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});

	it("PotDetailMessages : Unit Test Case 7 : You'll smash it",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 350,
              goal:1000,
              goalwhen : moment().add(3, 'months').format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});

	it("PotDetailMessages : Unit Test Case 8 : check it ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : null,
              goal:1000,
              goalwhen : moment().format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});


	it("PotDetailMessages : Unit Test Case 9",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 3600,
              goal:10001,
              goalwhen : moment().add(3, 'months').format('YYYY-MM'),
              balance:1,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(10001);
		});

	it("PotDetailMessages : Unit Test Case 11",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : null,
              goal:0,
              goalwhen : moment().format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(0);
		});
	
	it("PotDetailMessages : Unit Test Case 12",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 300,
              goal:600,
              goalwhen : '2017-12',
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);
         expect(props.goal).toBe(600);
		});

	it("PotDetailMessages : Unit Test Case 13",()=>{
		props = { 
			  amountvalue : 700,
              goal:600,
              goalwhen : '2017-10',
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);
         expect(props.goal).toBe(600);
		});

	it("PotDetailMessages : Unit Test Case 4 : That's spot on ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 176.93,
              goal:2300,
              goalwhen : '2017-11',
              balance:0,
              content : {content},
              
		}

		NumberUtils.appendCurrency.mockReturnValue('£2300');
		component = shallowRender(props);

         expect(props.goal).toBe(2300);
		});

	it("PotDetailMessages : Unit Test Case 14",()=>{
		props = { 
			  amountvalue : NaN,
              goal:'£',
              goalwhen : '2017-10',
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);
         expect(props.goal).toBe('£');
		});

	});

describe('PotDetailMessages ££££',()=>{

	it("PotDetailMessages : Unit Test Case 40 : That's spot on ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 176.93,
              goal:2300,
              goalwhen : '2017-11',
              balance:0,
              content : {content},
              
		}

		NumberUtils.appendCurrency.mockReturnValue('£');
		component = shallowRender(props);

         expect(props.goal).toBe(2300);
		});
});

describe('PotDetailMessages $$$',()=>{

	it("PotDetailMessages : Unit Test Case 41 : That's spot on ",()=>{
		props = { 
			  isChanged : true,
			  amountvalue : 1000,
              goal:1000,
              goalwhen : moment().format('YYYY-MM'),
              balance:0,
              content : {content},
              
		}
		component = shallowRender(props);

         expect(props.goal).toBe(1000);
		});
})