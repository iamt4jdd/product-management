import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppConstant } from 'src/app/core/constant/app-constant';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('product-management - Login');
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(savedUserEmail, [Validators.required]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    login() {
        localStorage.clear();
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        this.authenticationService
            .login(username.toLowerCase(), password).subscribe({
                next: data => {
                    console.log(data);
                    localStorage.setItem('employeeId', data.id.toString());
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('employeeName', data.employeeName);
                    localStorage.setItem('role', data.role);
                    if(data.role===AppConstant.ADMIN_ROLE){
                        this.router.navigate(['/dashboard']);
                    }
                    if(data.role===AppConstant.EMPLOYEE_ROLE){
                        this.notificationService.openSnackBar("Hiện tại hệ thống chưa hỗ trợ đăng nhập cho nhân viên.");
                        this.loading = false;
                    }
                },
                error:error => {
                    this.notificationService.openSnackBar("tài khoản hoặc mật khẩu sai, vui lòng thử lại");
                    this.loading = false;
                }}
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
