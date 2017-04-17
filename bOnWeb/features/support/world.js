import {camelCase} from 'lodash';
import {remote} from 'webdriverio';
import UI from '../data/UI';
import Urls from '../data/Urls';

const options = {
	desiredCapabilities: { browserName: 'chrome' },
	/*logLevel: 'DEBUG',*/
};
const viewportSize = { width: 1280, height: 600};
const screenshotBase = ['./features/screenshots/'].join(''); // TODO: Get BankId here

class World {
	constructor() {
		this.client = remote(options);
	}

	goTo(url) {
		return this.client
			.init()
			.setViewportSize(viewportSize)
			.url(Urls.build(url))
			.waitForExist(UI.common.componentHeader(), 6000)
	}

	getAddress(index) {
		return ({
			index,
			setMovedDate: value => (this.client.setValue(`#dateMoved_${index}`, value)),
			setPostcode: value => (this.client.moveToObject(`input[name=postcode_${index}_${index}]`).setValue(`input[name=postcode_${index}_${index}]`, value)),
			search: () => (this.client.click(`[name=address_${index}_findaddress]`))
		})
	}

	takeScreenshot(name, additional) {
		return this.client.saveScreenshot([screenshotBase, additional, camelCase(name), '.png'].join(''));
	}

	end(cb) {
		this.client.end();
		cb()
	}
}

module.exports = function() {
	this.World = World;
};
