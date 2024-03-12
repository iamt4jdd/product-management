export class ReportUpdateAmountRequest{
    id: number;
    amount:number;
    constructor(id:number,amount:number){
        this.id = id;
        this.amount = amount;
    }
}