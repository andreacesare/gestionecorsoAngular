import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Corso} from '../corso.model';
import {CorsoService} from '../corso.service';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-corso',
  standalone:true,
  imports: [
    DatePipe,
    RouterLink,
    FormsModule
  ],
  templateUrl: './search-corso.component.html',
  styleUrl: './search-corso.component.css'
})
export class SearchCorsoComponent {
  private route=inject(Router);
  private corsoService=inject(CorsoService);
  nome='';
  data='';
  durata='';
  docente='';
  corsi=signal<Corso[]>([]);


  onBack(){
    this.route.navigate(['/corsi']);
  }

  searchCorso(){
    this.corsoService.ricerca(this.nome,this.data,this.durata,this.docente).subscribe({
      next:c=>this.corsi.set(c)
    })

  }

}
