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
import {UserEntry} from '../../_models/entries/userEntry.model';

const baseURL = "api/entries";

@Injectable({ providedIn: 'root' })
export class EntriesService {
    
    constructor(private http: HttpClient) { }

    public getUserEntries<UserEntriesList>(limit: number, page: number) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.get<UserEntriesList>(url, {
            params: {
                limit: limit.toString(),
                page: page.toString()
            }
        });
    }

    public addNewEntry(newEntry: UserEntry) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.post(url, newEntry);
    }

    public deleteEntry(entryId: string) {
        var url = environment.baseBackendUrl + baseURL + "/" + entryId;
        return this.http.delete(url);
    }

    public getSingleEntry<UserEntry>(entryId: string) {
        var url = environment.baseBackendUrl + baseURL + "/" + entryId;
        return this.http.get<UserEntry>(url);
    }

    public editEntry(entryId: string, editedEntry: UserEntry) {
        var url = environment.baseBackendUrl + baseURL + "/" + entryId;
        return this.http.patch(url, editedEntry); 
    }

    errorHandler(error: HttpErrorResponse){
        return throwError(error.error)
    }
}