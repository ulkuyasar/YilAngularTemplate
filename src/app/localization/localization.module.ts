import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate/translate.pipe";

import 'devextreme/localization/globalize/number';
import 'devextreme/localization/globalize/date';
import 'devextreme/localization/globalize/message';


import trCldrData from 'devextreme-cldr-data/tr.json'
import deCldrData from 'devextreme-cldr-data/de.json'
import ruCldrData from 'devextreme-cldr-data/ru.json'
import supplementalCldrData from 'devextreme-cldr-data/supplemental.json'

import trMessages from '../../assets/localization/devextreme/tr.json'
import deMessages from 'devextreme/localization/messages/de.json'
import ruMessages from 'devextreme/localization/messages/ru.json'

import Globalize from 'globalize';
import { LocalizationResolver } from "./localization.resolver";

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

        debugger;
        // yasar buraya bakmalısın....
        Globalize.loadMessages(trMessages);
        Globalize.loadMessages(deMessages);
        Globalize.loadMessages(ruMessages);
    }
  }
