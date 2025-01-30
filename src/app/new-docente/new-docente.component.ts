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
export class NewDocenteComponent implements OnInit {
  private route=inject(Router);
  newDocente = signal<Docente>({} as Docente);
  private docenteService=inject(DocenteService);
  docenti=signal<Docente[] >([]);

  loadDocenti(){
    this.docenteService.getAllDocenti().subscribe({next:d=>this.docenti.set(d)});
  }
  ngOnInit() { this.loadDocenti()}

  onSubmit(form:NgForm){
    if(form.valid) {
      this.docenteService.saveDocente(this.newDocente()).subscribe({
        next: d => this.docenti.set([...this.docenti(), d])
      });

      this.route.navigate(['/docenti']);
    }else{console.log('error bro')}
  }
  onBack(){
    this.route.navigate(['/docenti']);
  }

}
