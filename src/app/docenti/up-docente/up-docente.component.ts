import {Component, inject, OnInit, signal} from '@angular/core';
import { Router} from '@angular/router';
import {Docente} from '../docente.model';
import {DocenteService} from '../docente.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-up-docente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './up-docente.component.html',
  styleUrl: './up-docente.component.css'
})
export class UpDocenteComponent implements OnInit{
  private route=inject(Router);
  private docenteService=inject(DocenteService);
  upDocente = signal<Docente>({} as Docente);
  docente=this.docenteService.docente.asReadonly();

  ngOnInit(){}

  onSubmit(){
      this.docenteService.updateDocente(this.upDocente(),this.docente().id).subscribe({
        next:()=>this.route.navigate(['/docenti'])
      });
  }

  onBack(){
    this.route.navigate(['/docenti']);
  }


}
