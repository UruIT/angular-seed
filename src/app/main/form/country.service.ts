import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CountryModel } from './country.model';

@Injectable()
export class CountryService {
	countriesEndpoint = 'https://restcountries.eu/rest/v1/all';

	constructor(private http: Http) { }

	getCountries(): Observable<CountryModel[]> {
		return this.http.get(this.countriesEndpoint)
			.map((response: Response) => response.json())
			.map((countries: any[]) => countries.map((country: any) => new CountryModel(country.alpha2Code, country.name)));
	}
}
