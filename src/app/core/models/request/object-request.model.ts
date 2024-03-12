export class ObjectRequest {
    size: Number;
    total: Number;
    page: Number;
    results: any[];

    constructor(size: Number, total: Number, page: Number, results: any[]) {
        this.size = size;
        this.total = total;
        this.page = page;
        this.results = results;
    }
}