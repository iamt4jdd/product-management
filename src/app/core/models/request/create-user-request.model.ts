export class CreateUserRequest {
    employeeName: String;
    userName: String;
    password: String;
    activeFlag: Boolean;
    roleId: Number;
    warehouseId: Number;
    phoneNumber:String;

    constructor(employeeName: String,
        userName: String,
        password: String,
        activeFlag: Boolean,
        roleId: Number,
        warehouseId: Number,phoneNumber:String) {
        this.employeeName = employeeName;
        this.userName = userName;
        this.password = password;
        this.activeFlag = activeFlag;
        this.roleId = roleId;
        this.warehouseId = warehouseId;
        this.phoneNumber = phoneNumber;
    }
}