import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {GetBarChartDataListModel} from "../../_models/charts/getBarChartDataList.model";
const baseURL = "api/charts";

@Injectable({ providedIn: 'root' })

export class ChartService {
    
    constructor(private http: HttpClient) { }

    public getBarChartData<GetBarChartDataListModel>(){
        var url = environment.baseBackendUrl + baseURL;
        return this.http.get<GetBarChartDataListModel>(url);
    }
}