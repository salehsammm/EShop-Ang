import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-home-page',
  imports:[RouterOutlet,RouterLink, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
