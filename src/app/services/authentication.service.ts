import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:44370/api/authentication';


  login(loginDto: LoginDto) : Observable<AuthResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<AuthResponse>(url, loginDto);
  }

  register(RegisterDto: RegisterDto) : Observable<AuthResponse>{
    const url = `${this.apiUrl}/register`;
    return this.http.post<AuthResponse>(url, RegisterDto);
  }


}
