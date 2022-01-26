import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as exceljs from 'exceljs';

if (environment.production) {
  enableProdMode();
}

// themes.initialized(() => {
//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));
// });

platformBrowserDynamic([
  {provide:"exceljs",useValue:exceljs}
]).bootstrapModule(AppModule);