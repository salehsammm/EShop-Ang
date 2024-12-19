import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HeaderHomeComponent } from "../components/header-home/header-home.component"; 
import {MatDividerModule} from '@angular/material/divider';
import { StoriesHomeComponent } from "../components/stories-home/stories-home.component"; 

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, RouterLink, MatButtonModule, HeaderHomeComponent, MatDividerModule, StoriesHomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
