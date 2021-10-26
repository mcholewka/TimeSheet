import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { LoadingService } from './_services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timesheet-webapp';
  loading$ = this.loader.loading$;

  constructor(private translate: TranslateService, public loader: LoadingService) {
    translate.setDefaultLang('en');
  }
}
