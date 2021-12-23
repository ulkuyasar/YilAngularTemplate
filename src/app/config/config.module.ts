import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfigResolver } from "./config.resolver";
import { ConfigService } from "./config.service";

@NgModule({
    declarations:[],
    imports:[
        CommonModule
    ],
    providers:[
        ConfigService,
        ConfigResolver,
    ]
})
export class ConfigModule{}