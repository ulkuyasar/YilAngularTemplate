import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StartupResolver } from "./startup.resolver";


@NgModule({
    declarations: [
     
    ],
    imports: [
      CommonModule
    ],
    providers: [StartupResolver]
  })
  export class StartupModule {
  }