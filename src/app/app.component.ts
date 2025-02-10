import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgClass} from '@angular/common';




@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, RouterModule, HomeComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestioneCorsoFE';

  isActive:string=' ';

  onClick(button:string){
    this.isActive=button;
  }
}
