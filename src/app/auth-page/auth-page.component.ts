import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthResponse } from '../models/auth-response';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

  showLogin: boolean = true;
  fName: string = '';
  lName: string = '';
  phoneNumber: string = '';
  userName: string = '';
  password: string = '';
  rePassword: string = '';

  constructor(private authenticationService: AuthenticationService) {}


  response:AuthResponse | null=null;

  loginRequest(): void {

    const loginDto = new LoginDto(this.userName, this.password);
    this.authenticationService.login(loginDto).subscribe({
      next: (response : AuthResponse) => {
        this.response = response;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

    // if (!this.userName || !this.password) {
    //   this.response = {
    //     status:2,
    //     message : " وارد کردن تمامی فیلد ها اجباری است"
    //   };
    // }
    // else{

    // }

  }

  registerRequest(): void {
    if (!this.fName || !this.lName || !this.phoneNumber || !this.userName || !this.password || !this.rePassword) {
      this.response = {
        status:2,
        message : " وارد کردن تمامی فیلد ها اجباری است"
      };
    }
    else if (this.password != this.rePassword) {
      this.response = {
        status:2,
        message : "کلمه عبور و تکرار آن یکسان نیستند"
      };
    }
    else{
      const registerDto = new RegisterDto(this.fName,this.lName,this.phoneNumber ,this.userName, this.password , this.rePassword);
      this.authenticationService.register(registerDto).subscribe({
        next: (response : AuthResponse) => {
          this.response = response;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
    }

  }

  changeAuthMode(showLogin : boolean): void{
    this.response = null;
    this.userName = '';
    this.password = '';

    if (!showLogin) {
      this.fName = '';
      this.lName = '';
      this.phoneNumber = '';
      this.rePassword = '';
    }
    
    this.showLogin = showLogin;
  }

}
