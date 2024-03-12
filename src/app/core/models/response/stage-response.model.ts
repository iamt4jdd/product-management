export class StageResponse {
    id: number;
    stageName: string;
    cost: number;
    completionAmount: number;
    productId: number;

    constructor(id: number, stageName: string,
        cost: number,
        completionAmount: number,
        productId: number) {
        this.id = id;
        this.stageName = stageName;
        this.cost = cost;
        this.completionAmount = completionAmount;
        this.productId = productId;

    }

}