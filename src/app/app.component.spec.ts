import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe(`App`, () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	// async beforeEach
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			schemas: [NO_ERRORS_SCHEMA]
		})
		.compileComponents(); // compile template and css
	}));

	// synchronous beforeEach
	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;

		fixture.detectChanges(); // trigger initial data binding
	});

	it(`should be already initialized`, () => {
		expect(fixture).toBeDefined();
		expect(component).toBeDefined();
	});

	it('should log ngOnInit', () => {
		spyOn(console, 'log');
		expect(console.log).not.toHaveBeenCalled();

		component.ngOnInit();
		expect(console.log).toHaveBeenCalled();
	});
});
