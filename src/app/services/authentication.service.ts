import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthResponse } from '../models/auth-response';
import { map, Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:44370/api/authentication';
  // private apiUrl = '/api/authentication';

  login(loginDto: LoginDto) : Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<LoginResponse>(url, loginDto);
  }

  register(RegisterDto: RegisterDto) : Observable<LoginResponse>{
    const url = `${this.apiUrl}/register`;
    return this.http.post<LoginResponse>(url, RegisterDto);
  }
}
