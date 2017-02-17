import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'uit-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	ngOnInit() {
		console.log('OnInit AppComponent');
	}
}
