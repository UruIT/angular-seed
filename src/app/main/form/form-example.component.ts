import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountryModel } from './country.model';
import { CountryService } from './country.service';
import { FormValidators } from '../../utils';

@Component({
	selector: 'uit-form-example',
	templateUrl: './form-example.component.html',
	styleUrls: ['./form-example.component.scss'],
	providers: [CountryService]
})
export class FormExampleComponent implements OnInit {
	countries: CountryModel[];
	form: FormGroup;
	formSubmitted: boolean;

	constructor(private countryService: CountryService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.getCountries();
		this.initForm();
	}

	isControlInvalid(control: string): boolean {
		return (this.formSubmitted || this.form.get(control).dirty) && this.form.get(control).invalid;
	}

	reset(): void {
		this.form.reset();
		this.formSubmitted = false;
	}

	sendForm(): void {
		this.formSubmitted = true;
		if (!this.form.valid) {
			return;
		}

		console.log(this.form.value);
		console.log('Form successfully submited');
	}

	showControlError(control: string, error: string): boolean {
		return (this.formSubmitted || this.form.get(control).dirty) && this.form.get(control).hasError(error);
	}

	private initForm(): void {
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, FormValidators.email]],
			gender: ['', Validators.required],
			country: ['', Validators.required],
			address: ['']
		});
	}

	private getCountries(): void {
		this.countryService.getCountries()
			.subscribe((countries: CountryModel[]) =>  this.countries = countries);
	}
}
