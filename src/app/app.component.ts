import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userId: string | null = null;
  userName: string | null=null;

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.loudUserData();
  }

  logOut():void{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.loudUserData();
    alert('از حساب خود خارج شدید');
    this.router.navigate(['']);
  }

  loudUserData():void{
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
  }

  title = 'EShop-ang';
}
