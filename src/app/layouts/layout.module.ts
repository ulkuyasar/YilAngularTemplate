import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { LocalizationModule } from '../localization/localization.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContentComponent } from './content/content.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmbeddedRouterOutletPanelComponent } from './embedded-router-outlet/embedded-router-outlet-panel/embedded-router-outlet-panel.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { FooterComponent } from './footer/footer.component';
import { GridCellButtonComponent } from './grid-cell-button/grid-cell-button.component';
import { GridCellButtonsHostComponent } from './grid-cell-buttons-host/grid-cell-buttons-host.component';
import { GridCellButtonsComponent } from './grid-cell-buttons/grid-cell-buttons.component';
import { GridFooterComponent } from './grid-footer/grid-footer.component';
import { GridToolbarComponent } from './grid-toolbar/grid-toolbar.component';
import { GridTreeComponent } from './grid-tree/grid-tree.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { HeaderComponent } from './header/header.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel/loading-panel.component';
import { MenuComponent } from './menu/menu.component';
import { ModelFormActionsComponent } from './model-form-actions/model-form-actions.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PopupPanelComponent } from './popup/popup-panel/popup-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {MarkdownModule} from 'ngx-markdown';
import { CollapseDirective } from './collapse/collapse.directive';








@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToolbarComponent,
    MenuComponent,
    ContentComponent,
    GridViewComponent,
    PopupPanelComponent,
    GridToolbarComponent,
    GridFooterComponent,
    EmbeddedRouterOutletPanelComponent,
    ErrorDialogComponent,
    FilterPanelComponent,
    CollapseDirective,
    GridCellButtonsComponent,
    GridCellButtonComponent,
    GridCellButtonsHostComponent,
    PageHeaderComponent,
    GridTreeComponent,
    ModelFormComponent,
    ModelFormActionsComponent,
    LoadingPanelComponent,
    //WarningConfirmComponent
    DeleteConfirmComponent,
    ConfirmComponent
    //GridPivotComponent
    //TabViewComponent
    //IFrameComponent
    //TooltipImageComponent



  ],
  imports: [
    CommonModule,
    RouterModule,
    DevextremeModule,
    CoreModule,
    LocalizationModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    MarkdownModule.forRoot()


  ],
  exports: [
    CoreModule,
    DevextremeModule,
    LocalizationModule,
    TooltipModule,

    HeaderComponent,
    FooterComponent,
    ToolbarComponent,
    MenuComponent,
    ContentComponent,
    GridViewComponent,
    GridToolbarComponent,
    GridFooterComponent,
    EmbeddedRouterOutletPanelComponent,
    FilterPanelComponent,
    CollapseDirective,
    GridCellButtonsComponent,
    GridCellButtonComponent,
    GridCellButtonsHostComponent,
    PageHeaderComponent,
    GridTreeComponent,
    ModelFormComponent,
    ModelFormActionsComponent,
    LoadingPanelComponent,
    GridTreeComponent

    //GridPivotComponent
    //TabViewComponent
    //IFrameComponent
    //TooltipImageComponent
  ],
  providers: [],
  entryComponents: [
    GridToolbarComponent,
    GridFooterComponent,
    GridCellButtonsComponent,
    GridCellButtonsHostComponent,
    EmbeddedRouterOutletPanelComponent,
    PopupPanelComponent,
    ErrorDialogComponent,
        //WarningConfirmComponent
        DeleteConfirmComponent,
        ConfirmComponent
        //ListViewComponent,
        //TooltipImageComponent,
        //AccordionViewComponent
  ]
})
export class LayoutModule { }
