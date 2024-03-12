export class RoleResponse {
    id: number;
    roleName: string;
    status: string;

    constructor(id: number, roleName: string, status: string) {
        this.id = id;
        this.roleName = roleName;
        this.status = status;
    }
}