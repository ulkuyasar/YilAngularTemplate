import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EnumValuePipe } from "./pipes/enum-value/enum-value.pipe";

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
