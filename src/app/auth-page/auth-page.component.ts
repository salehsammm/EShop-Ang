import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthResponse } from '../models/auth-response';
import { LoginResponse } from '../models/login-response';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,MatInputModule, MatButtonModule,
     MatTabsModule, MatIconModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {

  showLogin: boolean = true;
  fName: string = '';
  lName: string = '';
  phoneNumber: string = '';
  userName: string = '';
  password: string = '';
  rePassword: string = '';
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }


  response: LoginResponse | null = null;
  loginResponse: LoginResponse | null = null;
  userId: string | null = null;
  token: string | null = null;

  loginRequest(): void {
    if (!this.userName || !this.password) {
      this.loginResponse = {
        status: 2,
        message: " وارد کردن تمامی فیلد ها اجباری است",
        token: ''
      };
    }
    else {
      const loginDto = new LoginDto(this.userName, this.password);
      this.authenticationService.login(loginDto).subscribe({
        next: (response: LoginResponse) => {
          this.loginResponse = response;
          if (response.status == 1) {
            setTimeout(() => {
              this.router.navigate(['/products']);
            }, 500);
          }
        },
        error: (err) => {
          console.error('Error FOR LOGIN:', err);
        }
      });
    }
  }

  registerRequest(): void {
    window.scrollTo(0, 0);
    if (!this.fName || !this.lName || !this.phoneNumber || !this.userName || !this.password || !this.rePassword) {
      this.response = {
        status: 2,
        message: " وارد کردن تمامی فیلد ها اجباری است",
        token: ''
      };
    }
    else if (this.phoneNumber.length < 10 || isNaN(Number(this.phoneNumber))) { // If it's not a valid number, isNaN will return true, 
      this.response = {
        status: 2,
        message: "شماره موبایل معتبر نیست",
        token: ''
      };
    }
    else if (this.password.length < 6) {
      this.response = {
        status: 2,
        message: "کلمه عبور باید حداقل دارای 6 کارکتر باشد",
        token: ''
      };
    }
    else if (this.password != this.rePassword) {
      this.response = {
        status: 2,
        message: "کلمه عبور و تکرار آن یکسان نیستند",
        token: ''
      };
    }
    else {
      const registerDto = new RegisterDto(this.fName, this.lName, this.phoneNumber, this.userName, this.password, this.rePassword);
      this.authenticationService.register(registerDto).subscribe({
        next: (response: LoginResponse) => {
          this.response = response;
            setTimeout(() => {
              this.router.navigate(['/products']);
            }, 500);
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
    }
  }

  changeAuthMode(): void {
    this.response = null;
    this.loginResponse = null;
    this.userName = '';
    this.password = '';
    this.fName = '';
    this.lName = '';
    this.phoneNumber = '';
    this.rePassword = '';
    this.hide = true;
    this.hide2 = true;
  }

}
