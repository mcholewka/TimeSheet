import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserLogin} from "../../_models/user/UserLogin.model";
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {ResponseWithToken} from "../../_models/response/responseWithToken.model";
import {ResponseWithUserID} from "../../_models/response/responseWithUserID.model";
import {UserEntriesList} from "../../_models/entries/userEntriesList.model";

const baseURL = "api/entries";

@Injectable({ providedIn: 'root' })
export class EntriesService {
    
    constructor(private http: HttpClient) { }

    public getUserEntries<UserEntriesList>() {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.get<UserEntriesList>(url);
    }

    errorHandler(error: HttpErrorResponse){
        return throwError(error.error)
    }
}