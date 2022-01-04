import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

//import { localeTr } from '@angular/common/locales/tr';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFileUploaderModule, 
  DxFormModule, DxHtmlEditorModule, DxListModule, DxLoadPanelModule, DxMenuModule, DxPivotGridModule, DxPopupModule, DxRadioGroupModule, 
  DxScrollViewModule, DxSelectBoxModule, DxTabPanelModule, DxTabsModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, 
  DxTooltipModule, DxTreeListModule } from 'devextreme-angular';

//registerLocaleData(localeTr,'tr')   // yasar burayı duzenle
@NgModule({
  declarations: [

  ],
  imports: [
    
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxPopupModule,
    DxFormModule,
    DxTreeListModule,
    DxToolbarModule,
    DxMenuModule,
    DxLoadPanelModule,
    DxTabPanelModule,
    DxScrollViewModule,
    DxDropDownBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxHtmlEditorModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxTabsModule,
    DxPivotGridModule,
    DxListModule,
    DxAccordionModule,
    DxTooltipModule,
    DxTemplateModule
  ],
  exports: [
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxPopupModule,
    DxFormModule,
    DxTreeListModule,
    DxToolbarModule,
    DxMenuModule,
    DxLoadPanelModule,
    DxTabPanelModule,
    DxScrollViewModule,
    DxDropDownBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxHtmlEditorModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxTabsModule,
    DxPivotGridModule,
    DxListModule,
    DxAccordionModule,
    DxTooltipModule,
    DxTemplateModule
  ],
  providers: [{provide:LOCALE_ID,useValue:'tr'}]
})
export class DevextremeModule { }
