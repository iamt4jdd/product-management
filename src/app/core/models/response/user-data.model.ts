export class UserData {
    id: Number;
    employeeName: string;
    roleId: Number;
    roleName: string;
    phoneNumber:String;
    warehouseId: Number;
    warehouseName: string;
    activeFlag: boolean;

    constructor(id: Number,
        employeeName: string,
        roleId: Number,
        roleName: string,
        warehouseId: Number,
        warehouseName: string,
        activeFlag: boolean,
        phoneNumber:String) {
        this.id = id;
        this.employeeName = employeeName;
        this.roleId = roleId;
        this.roleName = roleName;
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
        this.activeFlag = activeFlag;
        this.phoneNumber = phoneNumber;
    }
}