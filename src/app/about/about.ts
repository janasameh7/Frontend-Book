import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule,RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
