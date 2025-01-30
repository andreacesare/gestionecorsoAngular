import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Docente} from './docente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteService} from './docente.service';

@Component({
  selector: 'app-docente',
  standalone:true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  private http=inject(HttpClient);
  private destroy=inject(DestroyRef);
  private docenteService=inject(DocenteService);
  docenti=this.docenteService.docenti.asReadonly();

  ngOnInit() {
    const sub=this.docenteService.getAllDocenti().subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());

  }
  onCancel(docente:Docente){
    const conferma = confirm('Sicuro di voler eliminare questo docente?');
    if(conferma){
    console.log(docente.nome+" "+docente.cognome+" ELIMINATO!")
    console.log(docente);
    this.docenteService.deleteDocente(docente).subscribe();
  }}


  }





