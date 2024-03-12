import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AppConstant } from "src/app/core/constant/app-constant";

@Injectable({providedIn: 'root'})
export class CanActivateRoleWithAdmin implements CanActivate{
    public role: String ="";
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       return this.checkAuthen();
    }
    
    private checkAuthen():boolean{
        this.role = (String)(localStorage.getItem(AppConstant.ROLE_KEY));
        if(this.role ===AppConstant.ADMIN_ROLE){
            return true;
        }
        return false;
    }
}