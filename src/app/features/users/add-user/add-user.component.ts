import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { RoleService } from 'src/app/core/services/role.service';
import { RoleResponse } from 'src/app/core/models/response/role-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateUserRequest } from 'src/app/core/models/request/create-user-request.model';
import { UserService } from 'src/app/core/services/user.service';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { Warehouse } from 'src/app/core/models/warehouse.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgForOf, NgIf]
})
export class AddUserComponent implements OnInit {

  depots: Warehouse[] = [];
  roles: RoleResponse[] = [];
  roleId: Number = 0;
  depotId: Number = 0;
  fullName: string = "";
  userName: string = "";
  password: string = "";
  phoneNumber:String ="";
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private userService: UserService,
    private wareHouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getAllDepot();
    this.getAllRole();
  }

  getAllDepot() {
    this.wareHouseService.getWarehouses(true).subscribe({
      next: data => {
        this.depots = data;
      },
      error: error => {
        this.notificationService.openSnackBar("Xảy ra lỗi lấy thông tin kho.");
      }
    });
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe({
      next: data => {
        this.roles = data;
      },
      error: error => {
        console.log("lỗi mẹ rồi trời ơi.")
      }
    });
  }

  onAddEmployee() {
    if (this.roleId == 1 && this.userName === "") {
      this.notificationService.openSnackBar("Tài khoản không được để trống.");
    } else if (this.depotId == 0) {
      this.notificationService.openSnackBar("Vui lòng chọn kho cho nhân viên.");
    } else {
      this.userService.addUser(new CreateUserRequest(this.fullName, this.userName, this.password, true, this.roleId, this.depotId,this.phoneNumber)).subscribe({
        next: data => {
          console.log(data);
          this.notificationService.openSnackBar("Đã thêm tài khoản thành công.");
          this.dialogRef.close(true);
        },
        error: error => {
          this.notificationService.openSnackBar("Thêm tài khoản thất bại.");
          this.dialogRef.close(false);
        }
      })
    }
  }

  onBack() {
    this.dialogRef.close(false);
  }

  onCheckToAdd() {
    if (this.fullName.trim() === "" || this.roleId === 0) {
      return false;
    }
    return true;
  }
}
