import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserRequest } from 'src/app/core/models/request/update-user-request.model';
import { RoleResponse } from 'src/app/core/models/response/role-response.model';
import { UserData } from 'src/app/core/models/response/user-data.model';
import { Warehouse } from 'src/app/core/models/warehouse.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { WarehouseService } from 'src/app/core/services/warehouse.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  depots: Warehouse[] = [];
  roles: RoleResponse[] = [];
  employeeName: String = "";
  employeeId: number = 0;
  employeeEnable: boolean = false;
  enableChane:boolean =false;
  empDetail: FormGroup;
  userResponse: UserData = new UserData(0, '', 0, '', 0, '', false,'');
  warehouseId:number = 0;
  roleId:number = 0;
  phoneNumber:String ="";

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private wareHouseService: WarehouseService,
    private roleService: RoleService) {
    this.empDetail = fb.group({
      employeeId: [{ value: ''}, [Validators.required]],
      employeeName: [{ value: '', disabled: true }, [Validators.required]],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required]],
      roleId: ['', [Validators.required]],
      roleName: [{ value: '', disabled: true }],
      warehouseId: ['', [Validators.required]],
      warehouseName: [{ value: '', disabled: true }, [Validators.required]],
      activeFlag: [{ value: ''}, [Validators.required]],
      password: ['']
    });
    this.onGetStateData(router);
    this.onGetEmpDetail(this.employeeId);
  }

  ngOnInit(): void {
    this.getAllDepot();
    this.getAllRole();
  }

  onGetEmpDetail(empId: number) {
    this.userService.geUserById(empId).subscribe({
      next: data => {
        this.userResponse = data;
        this.empDetail.setValue({
          employeeId: data.id,
          employeeName: data.employeeName,
          roleId: data.roleId,
          roleName: data.roleName,
          phoneNumber: data.phoneNumber,
          warehouseId: data.warehouseId,
          warehouseName: data.warehouseName,
          activeFlag: data.activeFlag,
          password:''
        });
        this.employeeEnable = data.activeFlag;
      },
      error: error => {
        this.notificationService.openSnackBar("Lỗi trong lúc lấy thông tin nhân viên");
      }
    })
  }

  onGetStateData(router: Router) {
    let currentNavigation = router.getCurrentNavigation();
    if (currentNavigation != null) {
      let extras = currentNavigation.extras;
      if (extras != null) {
        let states = extras.state;
        if (states != null) {
          this.employeeName = states['employeeName'];
          this.employeeId = states['employeeId'];
        }
      }
    }
  }

  onChangeStatus(){
    if(this.enableChane){
      this.employeeEnable =!this.employeeEnable
    }
  }

  onEnableChange(){
    this.enableChane =true;
    this.empDetail.get('employeeName')?.enable();
    this.empDetail.get('roleName')?.enable();
    this.empDetail.get('warehouseName')?.enable();
    this.empDetail.get('phoneNumber')?.enable();
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

  onUpdateEmp(){
    let formData = this.empDetail.value;
    console.log(formData);
    this.userService.updateUser(new UpdateUserRequest(formData.employeeId,formData.employeeName,formData.roleId,formData.password,formData.warehouseId,'',this.employeeEnable,formData.phoneNumber)).subscribe({
      next:async data=>{
        if(data){
          this.notificationService.openSnackBar("Cập nhập thông tin nhân viên thành công.");
          this.router.navigate(['users']);
        }
        else{
          this.notificationService.openSnackBar("Cập nhập thông tin nhân viên thất bại.");
        }
      },
      error:error=>{
        this.notificationService.openSnackBar("Cập nhập thông tin nhân viên thất bại.");
      }
    })
    }

}
