import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { BaseComponent } from "src/app/core/components/base-components";
import { ComponentName } from "src/app/core/decorators/component-name";


@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.scss']
})
@ComponentName(EventViewerComponent,"EventViewerComponent")
export class EventViewerComponent extends BaseComponent implements OnInit,OnDestroy{
 
  constructor(viewContainerRef:ViewContainerRef) {
    super(viewContainerRef);
   }

   ngOnInit(): void {
      super.ngOnInit();
   }

   ngOnDestroy(): void {
      super.ngOnDestroy();
   }
}