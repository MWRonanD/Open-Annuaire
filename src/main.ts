import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CONF_PROD } from './environments/environment.prod';
import 'hammerjs';

if (CONF_PROD.production) {
  enableProdMode();
}

platformBrowserDynamic()
.bootstrapModule(AppModule, {
   preserveWhitespaces: false
  })
  .catch(err => console.log(err));
