import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-stories-home',
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './stories-home.component.html',
  styleUrl: './stories-home.component.css'
})
export class StoriesHomeComponent {

  numbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
}
