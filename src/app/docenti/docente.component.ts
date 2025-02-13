import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteService} from './docente.service';
import {UpDocenteComponent} from './up-docente/up-docente.component';
import {NewDocenteComponent} from '../new-docente/new-docente.component';
import {MatDialog} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Docente} from './docente.model';

@Component({
  selector: 'app-docente',
  standalone:true,
  imports: [
    RouterLink,
    RouterOutlet,
    UpDocenteComponent,
    NewDocenteComponent,
    FormsModule
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private docenteService=inject(DocenteService);
  docenti=this.docenteService.docenti.asReadonly();
  docCercato='';
  docentiFiltrati=signal<Docente[]>([]);

  private dialog=inject(MatDialog);


  ngOnInit() {
    const sub=this.docenteService.getAllDocenti().subscribe({
      next:d=>this.docentiFiltrati.set(d)
    });
    this.destroy.onDestroy(()=>sub.unsubscribe());

  }

  openDialog(){
    this.dialog.open(NewDocenteComponent, {})
  }

  searchDocente(){
    this.docentiFiltrati.set(this.docenti().filter(d=>d.nome.toLowerCase().includes(this.docCercato.toLowerCase())
    || d.cognome.toLowerCase().includes(this.docCercato.toLowerCase())));
  }
}





