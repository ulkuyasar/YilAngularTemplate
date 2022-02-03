import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import Globalize from "globalize/dist/globalize";
import { LocalizationResolver } from "./localization.resolver";
import { TranslatePipe } from "./translate/translate.pipe";

import trCldrData from 'devextreme-cldr-data/tr.json'
import deCldrData from 'devextreme-cldr-data/de.json'
import ruCldrData from 'devextreme-cldr-data/ru.json'
import supplementalCldrData from 'devextreme-cldr-data/supplemental.json'

import trMessages from '../../assets/localization/devextreme/tr.json'
import deMessages from 'devextreme/localization/messages/de.json'
import ruMessages from 'devextreme/localization/messages/ru.json'

@NgModule({
    declarations: [
     TranslatePipe
    ],
    imports: [
      CommonModule
    ],
    exports: [
      TranslatePipe
    ],
    providers: [LocalizationResolver]
  })
  export class LocalizationModule {

    constructor(){
        this.initGlobalize();
    }

    initGlobalize(){

        Globalize.load(trCldrData);
        Globalize.load(deCldrData);
        Globalize.load(ruCldrData);
        Globalize.load(supplementalCldrData);

        // yasar buraya bakmalısın....
       // Globalize.loadMessages(trMessages);
       // Globalize.loadMessages(deMessages);
       // Globalize.loadMessages(ruMessages);
    }
  }
