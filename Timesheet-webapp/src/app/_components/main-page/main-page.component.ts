import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/_services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {TransaltionModel} from '../../_models/transaltions/translation.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})



export class MainPageComponent implements OnInit {

  data: any;
  opened: boolean;
  navigation: string = "entries";
  item: number = 1;
  translations: TransaltionModel[] = [
    { id: 1, name: 'EN' },
    { id: 2, name: 'PL' }
  ];
  activeTranslation: TransaltionModel;
  activeTransalationID: number = 1;
  translationPanelOpenState: boolean = false;

  constructor(public router: Router, private toastr: ToastrService, public userService: UserService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.data = jwt_decode(localStorage.getItem('token'));
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  navigateToEntries() {
    this.navigation = "entries";
  }

  navigateToStatistics() {
    this.navigation = "statistics";
  }

  manageMenuStyle(item: number) {
    console.log(item);
    this.item = item;
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  onSelect(translation: TransaltionModel): void {
    this.activeTranslation = translation;
    this.activeTransalationID = this.activeTranslation.id;

    switch(translation.id) {
      case 1: {
        this.useLanguage('en');
        break;
      }
      case 2: {
        this.useLanguage('pl');
        break;
      }
      default: {
        this.useLanguage('en');
        break;
      }
    }
  }

  state() {
    this.translationPanelOpenState = !this.translationPanelOpenState;
  }
}
