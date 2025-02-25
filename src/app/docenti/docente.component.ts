import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteService} from './docente.service';
import {UpDocenteComponent} from './up-docente/up-docente.component';
import {NewDocenteComponent} from '../new-docente/new-docente.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Docente} from './docente.model';
import {debounceTime, switchMap} from 'rxjs';

@Component({
  selector: 'app-docente',
  standalone:true,
  imports: [
    RouterLink,
    RouterOutlet,
    UpDocenteComponent,
    NewDocenteComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private docenteService=inject(DocenteService);
  docenti=signal<Docente[]>([]);
  docCercato='';
  docentiFiltrati=this.docenteService.docentiFiltrati;

  private dialog=inject(MatDialog);
  searchControl=new FormControl('');


  ngOnInit() {
    const sub=this.docenteService.getAllDocenti().subscribe({next:d=>this.docenti.set(d)});
    this.destroy.onDestroy(()=>sub.unsubscribe());

    this.searchControl.valueChanges.pipe(debounceTime(300),
      switchMap(text=>this.docenteService.ricerca(text || ''))).subscribe(r=>this.docenti.set(r));

  }

  openDialog(){

    const dialogRef=this.dialog.open(NewDocenteComponent, {});
    dialogRef.afterClosed().subscribe(()=>{ this.ngOnInit()});
  }

  searchDocente(){
    this.docentiFiltrati.set(this.docenti().filter(d=>d.nome.toLowerCase().includes(this.docCercato.toLowerCase())
      || d.cognome.toLowerCase().includes(this.docCercato.toLowerCase())));
  }


}





