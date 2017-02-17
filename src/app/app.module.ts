import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { MainModule } from './main';
import { SharedModule } from './shared';

import '../assets/styles/styles.scss';

/**
 * App entry point module.
 */
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
		MainModule,
		SharedModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
