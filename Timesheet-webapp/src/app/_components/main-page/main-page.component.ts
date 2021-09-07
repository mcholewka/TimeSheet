import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/_services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  data: any;

  constructor(public router: Router, private toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
    this.data = jwt_decode(localStorage.getItem('token'));
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
