import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_models/user/UserLogin.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
// import {UserService} from "../../_services/user/user.service";
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;


  public errorMsg: string;
  action: boolean = true;
  actionButtonLabel: string = 'X';

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  login(){
      this.userService.loginUser(new UserLogin(this.email, this.password)).subscribe(data=>{
      localStorage.setItem('token', data.token);
      console.log(data.token);
      if(data!=null){
        this.router.navigate(['/main']);
      }
    },
    error=>{this.errorMsg = error.message; console.log(this.errorMsg);
    }
    )
  }

}