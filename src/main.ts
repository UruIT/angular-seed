import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'rxjs/add/operator/map';

import { AppModule } from './app/app.module';
import { config, environments } from './app/shared';

if (config.environment === environments.live) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(error => console.log(error));
