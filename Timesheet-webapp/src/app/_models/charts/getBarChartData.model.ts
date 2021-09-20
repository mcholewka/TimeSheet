import {GetBarChartDataModelId} from "./getBarChartDataId.model";

export class GetBarChartDataModel {
    _id: GetBarChartDataModelId;
    total: number;
    
    constructor(_id: GetBarChartDataModelId, total: number) {
        this._id = _id;
        this.total = total;
    }
}