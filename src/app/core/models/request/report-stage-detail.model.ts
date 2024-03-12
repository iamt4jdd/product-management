export class ReporStageDetail {
    stageId: number;
    amount: number;

    constructor(stageId: number,
        amount: number) {
        this.amount = amount;
        this.stageId = stageId;
    }
}