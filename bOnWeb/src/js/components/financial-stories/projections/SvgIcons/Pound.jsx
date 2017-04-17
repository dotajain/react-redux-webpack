const React = require('react');
let setCssForWheel;
const Pound = React.createClass({
	render() {
		if (this.props.data !== undefined) {
			let warningsCount = this.props.data.projection_periods[0].warning_days.length;
			if (warningsCount == 0) {
				setCssForWheel = 'svgicon';
			}
			else {
				setCssForWheel = 'svgicon-alert';
			}
		}else {
			setCssForWheel = 'svgicon';
		}
		return (
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="64" height="65.969" viewBox="0 0 64 65.969" className={setCssForWheel} >
					<g>
					<rect width="64" height="66" rx="2" ry="2" className="svgiconItem" />
						<path class="st0" d="M32.5523453,0.0049631C14.8899794-0.3031817,0.3102125,13.7763443,0.0049594,31.4481659
							C-0.3030687,49.1104965,13.7763405,63.6903,31.4482803,63.9955177
							c17.6623306,0.3080254,32.2421341-13.7713814,32.5472336-31.4432869
							C64.300766,14.8804111,50.2241325,0.3100994,32.5523453,0.0049631 M31.5102234,59.9923248
							C16.0550213,59.7203217,3.7391136,46.9749985,3.9985812,31.5130367C4.2676563,16.0482635,17.0225487,3.7294285,32.4874382,3.9984682
							c15.4647751,0.2690752,27.7740746,13.0270119,27.5049973,28.491785
							C59.7300072,47.9425278,46.9749947,60.2613983,31.5102234,59.9923248 M36.4459496,43.1003761
							c-2.292408-0.0414734-3.4143486-1.7269897-6.0323811-1.7734299c-0.7367249-0.0151863-1.5184174,0.1297951-2.1370964,0.3294678
							c1.695879-1.1565132,3.1610794-2.8281403,3.2072506-5.3101425c0.0098896-0.6513672-0.1022873-1.2235298-0.2535782-1.7524567
							l4.9927177,0.0835571l0.0418816-2.1879883l-6.149847-0.1059952c-1.3635559-1.8941174-3.2157288-3.4713268-3.1607628-6.4371357
							c0.0526104-3.247324,2.7923965-5.1623363,5.9066181-5.1004219c2.4915733,0.0432415,4.4724579,1.6648273,5.1436653,3.4150448
							l2.7722435-1.5693016c-1.4648018-2.9088745-4.468132-4.6254902-8.2021103-4.6966209
							c-4.9516182-0.085659-9.2282906,3.3346214-9.3124714,7.8465405c-0.0454292,2.9627647,1.5961571,4.7404518,3.0459785,6.4721127
							l-4.3001022-0.0756874l-0.0391045,2.1974754l5.896965,0.09972c0.3516521,0.7395515,0.5907745,1.5552559,0.5715656,2.4499664
							c-0.0386982,2.4379768-2.0010815,4.6380997-5.5134964,6.0782547l1.1439495,2.5780907
							c1.7329578-0.8645554,3.4648228-1.5615501,4.8625202-1.5392838c3.0700798,0.0544777,3.6146736,1.9374962,7.3015823,1.9916229
							c2.5769348,0.0485382,4.3964462-0.7379379,5.565094-1.8064842l-1.4275322-2.7527924
							C39.8168335,42.2576408,38.2515488,43.1232529,36.4459496,43.1003761"/>
					</g>
				</svg>
			</div>
		);
	},
});

module.exports = Pound;