export class LoginResponse{
    id: Number;
    employeeName: string;
    role: string;
    token: string;

    constructor(id: Number, employeeName: string, role: string, token: string){
        this.id =id;
        this.employeeName = employeeName;
        this.role = role;
        this.token = token;
    }
}