import { browser, by, element } from 'protractor';

export class AppPo {
	static browse() {
		browser.get('/');
	}

	static getTitle() {
		return browser.getTitle();
	}

	static getHeading() {
		return element(by.css('h1'));
	}
}
