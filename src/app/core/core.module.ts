import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VarDirective } from "./directives/var.directive";
import { EnumValuePipe } from "./pipes/enum-value/enum-value.pipe";
import { MinuteSecondsPipe } from "./pipes/minute-seconds-value/minute-seconds-value.pipe";
import { ProcessValuePipe } from "./pipes/process-value/process-value.pipe";
import { SafePipe } from "./pipes/safe/safe.pipe";

@NgModule({
  declarations: [
   EnumValuePipe,
   ProcessValuePipe,
   MinuteSecondsPipe,
   SafePipe,
   VarDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EnumValuePipe,
    ProcessValuePipe,
    MinuteSecondsPipe,
    SafePipe,
    VarDirective
  ]
})
export class CoreModule {

 }
