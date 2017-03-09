import {FormPo} from './form.po';
import {browser} from "protractor/built";
import {protractor} from "protractor/built/ptor";

describe('Form route', () => {
	beforeEach(() => {
		FormPo.browse();
	});

	describe('Page rendering', () => {
		it('should have a title', () => {
			const subject = FormPo.getTitle();
			const result = 'UruIT Angular Seed';
			expect(subject).toEqual(result);
		});

		it('should have heading', () => {
			const heading = FormPo.getHeading();
			const subject = heading.isPresent();
			const result = true;
			expect(subject).toEqual(result);
		});

		it('heading should be Forms Example', () => {
			const headingText = FormPo.getHeading().getText();
			const result = 'Forms Example';
			expect(headingText).toEqual(result);
		});
	});

	describe('Form behavior', () => {
		describe('Submit pristine form', () => {
			it('Form should be pristine', () => {
				const subject = FormPo.getForm().getAttribute('class');
				const result = ['ng-untouched', 'ng-pristine'];
				expect(subject).toContain(result[0]);
				expect(subject).toContain(result[1]);
			});

			it('after submit, form should be invalid', () => {
				const form = FormPo.getForm();
				const button = FormPo.getSubmitFormButton();
				button.click();
				const result = 'invalid';
				const result2 = 'error';

				// First Name expectations
				const inputFirstName = FormPo.getInputByControlName('firstName');
				let subject =  FormPo.getInputFormGroup(inputFirstName).getAttribute('class');
				expect(subject).toContain(result);

				const inputFirstNameError = FormPo.getInputError(inputFirstName);
				subject = inputFirstNameError.getAttribute('class');
				expect(subject).toContain(result2);

				subject = inputFirstNameError.getText();
				let resultMesage = 'FirstName is required';
				expect(subject).toContain(resultMesage);

				// Last Name expectations
				const inputLastName = FormPo.getInputByControlName('lastName');
				subject = FormPo.getInputFormGroup(inputLastName).getAttribute('class');
				expect(subject).toContain(result);

				const inputLastNameError = FormPo.getInputError(inputLastName);
				subject = inputLastNameError.getAttribute('class');
				expect(subject).toContain(result2);

				subject = inputLastNameError.getText();
				resultMesage = 'LastName is required';
				expect(subject).toContain(resultMesage);

				// Email expectations
				const inputEmail = FormPo.getInputByControlName('email');
				subject = FormPo.getInputFormGroup(inputEmail).getAttribute('class');
				expect(subject).toContain(result);

				const inputEmailError = FormPo.getInputError(inputEmail);
				subject = inputEmailError.getAttribute('class');
				expect(subject).toContain(result2);

				subject = inputEmailError.getText();
				resultMesage = 'Email is required';
				expect(subject).toContain(resultMesage);
			});

			it('after reset, form should be valid again', () => {
				const form = FormPo.getForm();
				const button = FormPo.getResetFormButton();
				button.click();
				const result = 'invalid';

				// First Name expectations
				const inputFirstName = FormPo.getInputByControlName('firstName');
				let subject = FormPo.getInputFormGroup(inputFirstName).getAttribute('class');
				expect(subject).not.toContain(result);

				const inputLastName = FormPo.getInputByControlName('lastName');
				const controlLastName = FormPo.getInputFormGroup(inputLastName);
				subject = controlLastName.getAttribute('class');
				expect(subject).not.toContain(result);

				const inputEmail = FormPo.getInputByControlName('email');
				const controlEmail = FormPo.getInputFormGroup(inputEmail);
				subject = controlEmail.getAttribute('class');
				expect(subject).not.toContain(result);
			});
		});

		describe('Submit a invalid form', () => {
			it('submit without fill firstName should fail', () => {
				const form = FormPo.getForm();

				const result = 'invalid';
				const result2 = 'error';

				const inputLastName = FormPo.getInputByControlName('lastName');
				inputLastName.sendKeys('Snow');
				const inputEmail = FormPo.getInputByControlName('email');
				inputEmail.sendKeys('john.snow@winteriscomming.com');
				const radioBoxGender = FormPo.getRadioByValue('male');
				radioBoxGender.click();
				FormPo.selectOption('Uruguay');
				FormPo.getSubmitFormButton().click();

				const inputFirstName = FormPo.getInputByControlName('firstName');
				let subject = FormPo.getInputFormGroup(inputFirstName).getAttribute('class');
				expect(subject).toContain(result);

				const inputFirstNameError = FormPo.getInputError(inputFirstName);
				subject = inputFirstNameError.getAttribute('class');
				expect(subject).toContain(result2);
				subject = inputFirstNameError.getText();
				const resultMesage = 'FirstName is required';
				expect(subject).toContain(resultMesage);
			});
		});

		describe('Submit a valid form', () => {

			it('it should submit the form ', () => {
				const form = FormPo.getForm();
				const result = 'invalid';
				const result2 = 'error';
				const inputFirstName = FormPo.getInputByControlName('firstName');
				inputFirstName.sendKeys('John');
				const inputLastName = FormPo.getInputByControlName('lastName');
				inputLastName.sendKeys('Snow');
				const inputEmail = FormPo.getInputByControlName('email');
				inputEmail.sendKeys('john.snow@winteriscomming.com');
				const radioBoxGender = FormPo.getRadioByValue('male');
				radioBoxGender.click();
				FormPo.selectOption('Uruguay');

				FormPo.getSubmitFormButton().click();

				browser.manage().logs().get('browser').then((logs: Array<any>) => {
					expect(logs.pop().message).toContain('Form successfully submited');
				});
			});

		});
	});
});
