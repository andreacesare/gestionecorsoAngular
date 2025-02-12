import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteService} from './docente.service';
import {UpDocenteComponent} from './up-docente/up-docente.component';
import {NewDocenteComponent} from '../new-docente/new-docente.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-docente',
  standalone:true,
  imports: [
    RouterLink,
    RouterOutlet,
    UpDocenteComponent,
    NewDocenteComponent,
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private docenteService=inject(DocenteService);
  docenti=this.docenteService.docenti.asReadonly();

  private dialog=inject(MatDialog);

  ngOnInit() {
    const sub=this.docenteService.getAllDocenti().subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());

  }

  openDialog(){
    this.dialog.open(NewDocenteComponent, {})
  }





  }





