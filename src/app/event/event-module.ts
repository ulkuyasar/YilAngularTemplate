import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { EventViewerComponent } from "./event-viewer/event-viewer.component";


@NgModule({
    declarations: [
      EventViewerComponent
    ],
    imports: [
      CommonModule,
      ToastrModule.forRoot({
          toastClass:'toast toast-bootstrap-compatibility-fix',
          positionClass:'toast-bottom-right',
          timeOut:3500
      })
    ],
    exports:[
        ToastrModule,
        EventViewerComponent
    ],
    providers: []
   
  })
  export class EventModule { 
    constructor(){}
  }
  