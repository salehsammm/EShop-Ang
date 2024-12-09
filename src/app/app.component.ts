import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.userStatus$.subscribe(() =>{
      this.userId = localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
    })
  }

  logOut(): void {
    this.authenticationService.logout();
    alert('از حساب خود خارج شدید');
    this.router.navigate(['']);
  }

  title = 'EShop-ang';
}
