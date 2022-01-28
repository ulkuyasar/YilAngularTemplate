import { Component, HostBinding, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = "Yil Yasar Template";
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(@Inject("exceljs") private exceljs: unknown, public test: VersionCheckService) {

      test.initVersionCheck(environment.versionCheckURL);
  }
}
