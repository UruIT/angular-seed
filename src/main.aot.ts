import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import 'rxjs/add/operator/map';

import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
