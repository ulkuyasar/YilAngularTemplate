

import { NgModule } from '@angular/core';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { LoadingPanelComponent } from './loading-panel/loading-panel/loading-panel.component';
import { PopupPanelComponent } from './popup/popup-panel/popup-panel.component';

@NgModule({
  declarations: [
    LoadingPanelComponent,
    PopupPanelComponent
    
  ],
  imports: [
    DevextremeModule
  ],
  exports: [
    DevextremeModule
  ],
  providers: [],
  entryComponents: [
    LoadingPanelComponent,
    PopupPanelComponent
  ]
})
export class LayoutModule { }
