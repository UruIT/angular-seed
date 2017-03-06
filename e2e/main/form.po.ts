import { browser, by, element, ElementFinder, promise } from 'protractor';

export class FormPo {

	static browse(): void {
		browser.get('/form');
	}

	static getTitle(): promise.Promise<string> {
		return browser.getTitle();
	}

	static getHeading(): ElementFinder {
		return element(by.css('uit-form-example h1'));
	}

	static getForm(): ElementFinder {
		return element(by.css('uit-form-example form'));
	}

	static getSubmitFormButton(): ElementFinder {
		return this.getForm().element(by.buttonText('Send'));
	}

	static getResetFormButton(): ElementFinder {
		return this.getForm().element(by.buttonText('Reset'));
	}

	static getInputByControlName(key): ElementFinder {
		return this.getForm().element(by.css('[formcontrolname=' + key + ']'));
	}

	static getInputError(input: ElementFinder): ElementFinder {
		return input.element(by.xpath('..//child::span'));
	}

	static getInputFormGroup(input: ElementFinder): ElementFinder {
		return input.element(by.xpath('..'));
	}

	static getRadioByValue(value: string): ElementFinder {
		return this.getForm().element(by.css('[value=' + value + ']'));
	}

	static selectOption(value: string) {
		this.getForm().element(by.css('[formcontrolname=country]')).click();
		browser.wait(() => element(by.cssContainingText('option', value)).isPresent(), 3000); // sync is needed
		element(by.cssContainingText('option', value)).click();
	}
}
