export class GetBarChartDataModel {
    _id: number;
    total: number;
    
    constructor(_id: number, total: number) {
        this._id = _id;
        this.total = total;
    }
}