const React = require('react');

let setCssForWheel;
const Camera = React.createClass({
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
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="64" height="66" viewBox="0 0 64 66" className={setCssForWheel}>
					<g>
						<rect width="64" height="66" rx="2" ry="2" className="svgiconItem" />
						<path id="SVGID_1_" d="M38,40c5.5198975,0,10-4.4699707,10-10c0-5.5200195-4.4801025-10-10-10c-5.5200195,0-10,4.4799805-10,10
			C28,35.5300293,32.4799805,40,38,40 M38,24c3.3199463,0,6,2.6900635,6,6c0,3.3200684-2.6800537,6-6,6
			c-3.3100586,0-6-2.6799316-6-6C32,26.6900635,34.6899414,24,38,24 M4,36h4v-4H6c-1.1000977,0-2-0.8900146-2-2V6
			c0-1.0999756,0.8999023-2,2-2h40c1.1099854,0,2,0.9000244,2,2v2h4V4c0-2.2099609-1.7900391-4-4-4H4C1.789917,0,0,1.7900391,0,4v28
			C0,34.210083,1.789917,36,4,36 M12,16v28c0,2.210083,1.789917,4,4,4h44c2.2099609,0,4-1.789917,4-4V16
			c0-2.2099609-1.7900391-4-4-4H16C13.789917,12,12,13.7900391,12,16 M18,16h40c1.1099854,0,2,0.9000244,2,2v24
			c0,1.1099854-0.8900146,2-2,2H18c-1.1000977,0-2-0.8900146-2-2V18C16,16.9000244,16.8999023,16,18,16"/>
					</g>
				</svg>
			</div>
		);
	},
});

module.exports = Camera;
