import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Feature1Component } from './feature-1/feature-1.component';

const routes: Routes = [
	{ path: '', component: Feature1Component }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LazySampleRoutingModule { }
