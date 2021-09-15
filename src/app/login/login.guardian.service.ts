import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot } from "@angular/router";
import { LogingService } from "./login.service";

@Injectable()
export class LoginGuardian implements CanActivate {
    constructor(private loginService:LogingService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
         if(this.loginService.isAutenticado()){
            return true;
         }else{
             this.router.navigate(['login']);
             return false;
         }
    }
}