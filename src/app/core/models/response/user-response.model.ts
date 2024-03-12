import { UserData } from "./user-data.model";

export class UserResponse {
    size: Number;
    total: Number;
    page: Number;
    results: UserData[];

    constructor(size: Number, total: Number, page: Number, result: UserData[]) {
        this.size = size;
        this.total = total;
        this.page = page;
        this.results = result;
    }
}