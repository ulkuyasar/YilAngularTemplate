

import { NgModule } from '@angular/core';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { LocalizationModule } from '../localization/localization.module';
import { LoadingPanelComponent } from './loading-panel/loading-panel/loading-panel.component';
import { PopupPanelComponent } from './popup/popup-panel/popup-panel.component';

@NgModule({
  declarations: [
    LoadingPanelComponent,
    PopupPanelComponent
    
  ],
  imports: [
    DevextremeModule,
    LocalizationModule
  ],
  exports: [
    DevextremeModule,
    LocalizationModule
  ],
  providers: [],
  entryComponents: [
    LoadingPanelComponent,
    PopupPanelComponent
  ]
})
export class LayoutModule { }
