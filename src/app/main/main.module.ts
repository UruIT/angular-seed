import { NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { FormExampleComponent } from './form/form-example.component';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared';

@NgModule({
	imports: [MainRoutingModule, SharedModule],
	declarations: [AboutComponent, FormExampleComponent, HomeComponent]
})
export class MainModule { }
