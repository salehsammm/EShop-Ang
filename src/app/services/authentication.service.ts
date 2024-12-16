import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '../models/user-dto';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private shoppingCartService:ShoppingCartService) { }
  private apiUrl = 'api/authentication';

  private userSubject = new BehaviorSubject<boolean>(this.hasToken());
  public userStatus$ = this.userSubject.asObservable(); // In Angular, it’s a convention to use the $ suffix for Observables

  register(RegisterDto: RegisterDto): Observable<LoginResponse> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<LoginResponse>(url, RegisterDto).pipe(
      map(response => {
        this.setAuthData(response.token);
        this.shoppingCartService.getShoppingCartCount().subscribe();
        return response;
      })
    );
  }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<LoginResponse>(url, loginDto).pipe(
      map(response => {
        if (response.status == 1) {
          this.setAuthData(response.token);
        }
        this.shoppingCartService.getShoppingCartCount().subscribe();
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    this.userSubject.next(false);
  }

  private setAuthData(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken["UserId"];
    const userName = decodedToken["UserName"];
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userToken', token);
    this.userSubject.next(true);
  }

  private hasToken(): boolean {
    if (localStorage.getItem('userToken')) return true;
    return false;
  }

  getUser(): Observable<UserDto> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserDto>(`${this.apiUrl}`, { headers });
  }

  updateUser(userDto: UserDto): Observable<void> {
    const url = `${this.apiUrl}`;
    return this.http.put<void>(url, userDto).pipe(
      map(response => {
        //
        return response;
      })
    );
  }

}
