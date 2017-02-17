import { NgModule } from '@angular/core';

import { Feature1Component } from './feature-1/feature-1.component';
import { LazySampleRoutingModule } from './lazy-sample-routing.module';
import { SharedModule } from '../shared';

@NgModule({
	imports: [LazySampleRoutingModule, SharedModule],
	declarations: [Feature1Component]
})
export class LazySampleModule { }
