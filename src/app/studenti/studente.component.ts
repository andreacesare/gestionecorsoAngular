import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import{Studente} from './studente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StudenteService} from './studente.service';
import {DatePipe} from "@angular/common";
import {MatDialog} from '@angular/material/dialog';
import {NewStudenteComponent} from '../new-studente/new-studente.component';
import {FormsModule} from '@angular/forms';
import {Docente} from '../docenti/docente.model';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DatePipe, FormsModule],
  templateUrl: './studente.component.html',
  styleUrl: './studente.component.css'
})
export class StudenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private studenteService=inject(StudenteService);
  studenti=this.studenteService.studenti.asReadonly();
  private dialog=inject(MatDialog);
  studenteCercato='';
  studentiFiltrati=signal<Studente[]>([]);
  matricola='';


  ngOnInit() {
    const sub=this.studenteService.getAllStudenti().subscribe({
      next:s=>this.studentiFiltrati.set(s)
    });
    this.destroy.onDestroy(()=>sub.unsubscribe());
  }

  openDialog(){
  this.dialog.open(NewStudenteComponent, {})
}

  searchStudente(){
    this.studentiFiltrati.set(this.studenti().filter(s=>s.nome.toLowerCase().includes(this.studenteCercato.toLowerCase())
    || s.cognome.toLowerCase().includes(this.studenteCercato.toLowerCase())));
  }

  searchMatricola(){
    this.studentiFiltrati.set(this.studenti().filter(s=>s.matricola.toLowerCase().includes(this.matricola.toLowerCase())));
  }
}
