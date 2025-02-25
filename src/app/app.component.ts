import {Component, inject} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
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
  private route=inject(Router);

  logout(){
    const conferma=confirm('Sei sicuro di voler uscire?');
    if(conferma){
    this.route.navigate(['login']);
    localStorage.removeItem('token');
  }}


}
