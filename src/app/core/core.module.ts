import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { MessagingService } from './services';

@NgModule({
	imports: [RouterModule],
	exports: [HttpModule, HeaderComponent],
	declarations: [HeaderComponent],
	providers: [MessagingService] // place here your app-wide singleton services
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
