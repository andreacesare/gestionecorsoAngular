import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import{Studente} from './studente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StudenteService} from './studente.service';
import {DatePipe} from "@angular/common";
import {MatDialog} from '@angular/material/dialog';
import {NewStudenteComponent} from '../new-studente/new-studente.component';

@Component({
  selector: 'app-studente',
  standalone: true,
    imports: [RouterLink, RouterOutlet, DatePipe],
  templateUrl: './studente.component.html',
  styleUrl: './studente.component.css'
})
export class StudenteComponent implements OnInit{
  private destroy=inject(DestroyRef);
  private studenteService=inject(StudenteService);
  studenti=this.studenteService.studenti.asReadonly();
  private dialog=inject(MatDialog);

  ngOnInit() {
    const sub=this.studenteService.getAllStudenti().subscribe();
    this.destroy.onDestroy(()=>sub.unsubscribe());
  }


  openDialog(){
  this.dialog.open(NewStudenteComponent, {})
}
}
