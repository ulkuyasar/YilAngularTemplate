import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
//import { localeTr } from '@angular/common/locales/tr';
import { DxLoadPanelModule } from 'devextreme-angular';

//registerLocaleData(localeTr,'tr')   // yasar burayı duzenle
@NgModule({
  declarations: [

  ],
  imports: [
    DxLoadPanelModule
  ],
  exports: [
    DxLoadPanelModule
  ],
  providers: [{provide:LOCALE_ID,useValue:'tr'}]
})
export class DevextremeModule { }
