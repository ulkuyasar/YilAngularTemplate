import { Component, HostBinding, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VersionCheckService } from './version-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = "Yil Yasar Template";

  constructor(@Inject("exceljs") private exceljs: unknown, public test: VersionCheckService) {
    debugger; //2
    // test.initVersionCheck(environment.versionCheckURL);
  }
}
