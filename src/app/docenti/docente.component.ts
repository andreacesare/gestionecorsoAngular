import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Docente} from './docente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteService} from './docente.service';
import {UpDocenteComponent} from './up-docente/up-docente.component';

@Component({
  selector: 'app-docente',
  standalone:true,
  imports: [
    RouterLink,
    RouterOutlet,
    UpDocenteComponent
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private docenteService=inject(DocenteService);
  docenti=this.docenteService.docenti.asReadonly();


  ngOnInit() {
    const sub=this.docenteService.getAllDocenti().subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());

  }





  }





