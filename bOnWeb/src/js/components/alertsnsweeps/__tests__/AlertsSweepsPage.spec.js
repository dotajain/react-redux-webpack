/**
 * @module AlertsSweepsPage
 */
jest.unmock('../AlertsSweepsPage');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const SweepsStores = require('../../../stores/SweepsStores');

const AlertsSweepsPage = require('../AlertsSweepsPage');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AlertsSweepsPage
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('AlertsSweepsPage Test Cases check', () => {

	beforeEach(() => {	
		props = {			
            content: {},
            data: {},
		}
		//component = shallowRender(props);
	});

	it('Unit Test Case 1 : AlertsSweepsPage : toBeDefined',()=>{
		//expect(component).toBeDefined();
	});
    it('calls render method', () => {        
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        let moduleName = '';
        //expect(moduleName).toBeDefined('alertSweep');
    });

    // describe('onStoreChange', () => {
    //     AlertsNSweepsStore.getSweepsList.mockReturnValue('sweepsdata');
    //     AlertsNSweepsStore.showHeader.mockReturnValue(true);
	// 	let node = document.createElement('div');
	// 	let onStoreChange = jest.genMockFn();
        
	// 	let instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
	// 	it('calls for the class change', () => {
	// 		instance.onStoreChange();
    //         expect(instance.state.alertSweepClass).toBe('alertSweep');

	// 	});
        
    //     it('calls for the class change 1', () => {
    //         AlertsNSweepsStore.getSweepsList.mockReturnValue('');
    //         AlertsNSweepsStore.getAlertsList.mockReturnValue('');
    //         AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue('');
	// 		instance.onStoreChange();
    //         expect(instance.state.alertSweepClass).toBe('alertnsweep');

	// 	});

	// });

    // describe('componentWillUnmount', () => {
	// 	let component;
	// 	const props = {
	// 		content: {

	// 		},
	// 	};
	// 	it('calls for the removeChangeListener', () => {
	// 		let node = document.createElement('div');
	// 		const render = (comp, el) => ReactDOM.render(comp, el);
	// 		component = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
	// 		React.unmountComponentAtNode(node);
	// 		expect(AlertsNSweepsStore.removeChangeListener.mock.calls.length).toBe(1);
    //         expect(SweepsStores.removeChangeListener.mock.calls.length).toBe(1);
	// 	});
	// });
    // describe('setString', () => {
	// 	let component;
	// 	component = TestUtils.renderIntoDocument(
	// 			<AlertsSweepsPage {...props}/>
	// 		);
    //     component.setState({ sweepsData: [], alertsData:[], projectionAlertsData:[],});

	// 	xit('calls for the setString', () => {
	// 		let node = document.createElement('div');
	// 		component.setString();
	// 		expect(component.setString).toBeDefined();
    //         expect(component.state.alertSweepClass).toBe('alertnSweep');
	// 	});        
    //     xit('calls for the setString without param', () => {
	// 		let node = document.createElement('div');
    //         component.setState({ sweepsData: [{key:1}], alertsData:[{key:2}], projectionAlertsData:[{key:3}],});
	// 		component.setString();
	// 		expect(component.state.alertSweepClass).toBe('alertSweep');
	// 	});
    //      xit('calls for the setString, passing parameter', () => {
	// 		let node = document.createElement('div');
	// 		component.setString('Edit');
	// 		expect(component.state.alertSweepClass).toBe('create-alert');
	// 	});
	// });    
// describe('To check onClose Function', () => {
// 	    let instance;
// 		    let props = {
//         onClose: jest.genMockFn(),

//         content: {
//         },
//     };
// 	    it('calls for the onClose function', () => {
//         let node = document.createElement('div');
//         let onClose = jest.genMockFn();
//         const render = (comp, el) => ReactDOM.render(comp, el);
//         instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
// 		instance.setState({ compName: '',name:'' });
//         instance.onClose();
//         expect(instance.onClose).toBeDefined();
//     });

// });
describe('To check onStoreChange Function', () => {
    let instance;
    let props = {
        onStoreChange: jest.genMockFn(),
        e: '1',
        content: {
			'alertsSweepsHead':'',
        },
    };
    it('calls for the onStoreChange function', () => {
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
       
		AlertsNSweepsStore.showHeader.mockReturnValue(true);
		AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
		AlertsNSweepsStore.getSweepsList.mockReturnValue([{id:'asdasd'}]);
		AlertsNSweepsStore.getAlertsList.mockReturnValue([{id:'asdasd'}]);
		AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue([{id:'asdasd'}]);		
		AlertsNSweepsStore.isNetworkError.mockReturnValue(false);

		const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
		//instance.setState({getStateFromStores:'', storeChanged:true });
		
		// AlertsNSweepsStore.getSweepsList.mockReturnValue({id:'abcd', name:'swaty'});
		// AlertsNSweepsStore.getAlertsList.mockReturnValue(true);
		// AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue(true);
		// AlertsNSweepsStore.getAlertsList.mockReturnValue(true);
		// AlertsNSweepsStore.getSweepsList.mockReturnValue(true);

        instance.onStoreChange();
		expect(instance.onStoreChange).toBeDefined();
        //expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
    });
	    it('calls for the onStoreChange function showHeader else condition', () => {
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
		AlertsNSweepsStore.showHeader.mockReturnValue(false);
		const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.onStoreChange();
		expect(instance.onStoreChange).toBeDefined();
    });
		    it('calls for the onStoreChange function getLoadStatus else condition', () => {
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
		AlertsNSweepsStore.showHeader.mockReturnValue(true);
		AlertsNSweepsStore.getLoadStatus.mockReturnValue(false);
		const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.onStoreChange();
		expect(instance.onStoreChange).toBeDefined();
    });
		    it('calls for the onClose function', () => {
        let node = document.createElement('div');
        let onClose = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
		instance.setState({ compName: '',name:'' });
        instance.onClose();
        expect(instance.onClose).toBeDefined();
    });
		 it('calls for the _reload function', () => {
        let node = document.createElement('div');
        let _reload = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance._reload();
        expect(instance._reload).toBeDefined();
    });
	    it('calls for the createSweep function', () => {
        let node = document.createElement('div');
        let createSweep = jest.genMockFn();
		AlertsNSweepsStore.showSweepPage.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.createSweep();
        expect(instance.createSweep).toBeDefined();
    });

    it('calls for the createAlert function', () => {
        let node = document.createElement('div');
        let createSweep = jest.genMockFn();
		AlertsNSweepsStore.showAlertPage.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.createAlert();
        expect(instance.createAlert).toBeDefined();
    });
		 it('calls for the createSweep function else path', () => {
        let node = document.createElement('div');
        let createSweep = jest.genMockFn();
		AlertsNSweepsStore.showSweepPage.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.createSweep();
        expect(instance.createSweep).toBeDefined();
    });

     it('calls for the createAlert function else path', () => {
        let node = document.createElement('div');
        let createAlert = jest.genMockFn();
		AlertsNSweepsStore.showAlertPage.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.createAlert();
        expect(instance.createAlert).toBeDefined();
    });

    it('calls for the removeChangeListener', () => {
		let props = {
			content: '',
		}
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let component = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
		React.unmountComponentAtNode(node);
        component.componentWillUnMount();
		expect(AlertsNSweepsStore.removeChangeListener.mock.calls.length).toBe(1);
	});


		it('calls for the openFaq function', () => {
        let node = document.createElement('div');
        let openFaq = jest.genMockFn();
		AlertsNSweepsStore.showSweepPage.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.openFaq();
        expect(instance.openFaq).toBeDefined();
    });
		it('calls for the closeFaq function', () => {
        let node = document.createElement('div');
        let closeFaq = jest.genMockFn();
		AlertsNSweepsStore.showSweepPage.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<AlertsSweepsPage {...props} />, node);
        instance.closeFaq();
        expect(instance.closeFaq).toBeDefined();
    });
});
       	
	
});
