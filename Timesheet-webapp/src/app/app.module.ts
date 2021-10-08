import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {MaterialModule} from './_shared/material/material.module';
import { TokenIntercpetor } from './_shared/http/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntriesComponent } from './_components/main-page/entries/entries.component';
import { AddEntryModalComponent } from './_components/main-page/entries/modals/add-entry-modal/add-entry-modal.component';
import { DeleteEntryModalComponent } from './_components/main-page/entries/modals/delete-entry-modal/delete-entry-modal.component';
import { EditEntryModalComponent } from './_components/main-page/entries/modals/edit-entry-modal/edit-entry-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StatisticsComponent } from './_components/main-page/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { NotesModalComponent } from './_components/main-page/entries/modals/notes-modal/notes-modal.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    EntriesComponent,
    AddEntryModalComponent,
    DeleteEntryModalComponent,
    EditEntryModalComponent,
    StatisticsComponent,
    NotesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercpetor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}