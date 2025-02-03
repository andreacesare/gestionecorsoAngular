import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Docente} from '../docenti/docente.model';
import {DocenteService} from '../docenti/docente.service';

@Component({
  selector: 'app-new-docente',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-docente.component.html',
  styleUrl: './new-docente.component.css'
})
export class NewDocenteComponent  {
  private route=inject(Router);
  newDocente = signal<Docente>({} as Docente);
  private docenteService=inject(DocenteService);



  onSubmit(form:NgForm){
    if(form.valid) {
      this.docenteService.saveDocente(this.newDocente()).subscribe();

      this.route.navigate(['/docenti']);
    }else{console.log('error bro')}
  }
  onBack(){
    this.route.navigate(['/docenti']);
  }

}
