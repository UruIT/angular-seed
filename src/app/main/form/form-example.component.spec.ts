import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExampleComponent } from './form-example.component';
// import { CountryService } from './country.service';

describe(`Form Example Component`, () => {
	let component: FormExampleComponent;
	let fixture: ComponentFixture<FormExampleComponent>;

	// const countryServiceMock = {
	// 	countriesEndpoint: '',
	// 	getCountries: { code: '0', name: 'Uruguay' }
	// };

	// async beforeEach
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormExampleComponent],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents(); // compile template and css
	}));

	// synchronous beforeEach
	beforeEach(() => {
		fixture = TestBed.createComponent(FormExampleComponent);
		component = fixture.componentInstance;

		fixture.detectChanges(); // trigger initial data binding
	});

	it(`este todo defindo`, () => {
		console.log('fixture');
		console.log(fixture);
		console.log('component');
		console.log(component);
		expect(true).toEqual(true);
	});
});
