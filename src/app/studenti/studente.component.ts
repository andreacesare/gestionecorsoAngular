import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import{Studente} from './studente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StudenteService} from './studente.service';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './studente.component.html',
  styleUrl: './studente.component.css'
})
export class StudenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private studenteService=inject(StudenteService);
  studenti=this.studenteService.studenti.asReadonly();

  ngOnInit() {
    const sub=this.studenteService.getAllStudenti().subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());
  }

  onDelete(studente:Studente){
    const conferma=confirm('Sicuro di voler eliminare:'+studente.nome+" "+studente.cognome+" ?")
    if(conferma){
    console.log(studente.nome+" "+studente.cognome+" ELIMINATO!");
    const sub=this.studenteService.deleteStudente(studente).subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());
  }

}}
