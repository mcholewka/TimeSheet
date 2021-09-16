import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/_components/login/login.component';
import {RegisterComponent} from '../app/_components/register/register.component';
import {MainPageComponent} from "../app/_components/main-page/main-page.component";
import {EntriesComponent} from "../app/_components/main-page/entries/entries.component";
import {StatisticsComponent} from "../app/_components/main-page/statistics/statistics.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainPageComponent},
  { path: 'entries', component: EntriesComponent},
  { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
