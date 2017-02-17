import { AbstractControl } from '@angular/forms';

export class FormValidators {
	static email(control: AbstractControl): { [key: string]: boolean } {
		/* tslint:disable */
		// RFC 2822 compliant regexp
		const emailRegexp =
			/[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
		/* tslint:enable */
		return !control.value || emailRegexp.test(control.value) ? null : { 'email': true };
	}
}
