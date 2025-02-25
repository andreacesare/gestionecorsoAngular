import {Component, computed, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {Corso} from '../corso.model';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

import {CorsoService} from '../corso.service';
import {MatDialog} from '@angular/material/dialog';

import {DatePipe} from '@angular/common';
import {UpCorsoComponent} from '../up-corso/up-corso.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudenteService} from '../../studenti/studente.service';
import {Studente} from '../../studenti/studente.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-corso',
  standalone: true,
  imports: [RouterModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './info-corso.component.html',
  styleUrl: './info-corso.component.css'
})
export class InfoCorsoComponent implements OnInit {
  private activeRoute=inject(ActivatedRoute);
  private route=inject(Router);
  private location=inject(Location);
  private corsoService=inject(CorsoService);
  private studenteService=inject(StudenteService);
  corso=this.corsoService.corso.asReadonly();
  studenti=signal<Studente[]>([]);
  studentiNonIscritti= computed(()=>this.studenti().filter(s=>!this.corso().discenti.some(d=>d.id===s.id)));
  studente={} as Studente;
  idCorso:number | null=null;
  private dialog=inject(MatDialog);
  @ViewChild('dialogAdd') dialogAdd!:ElementRef<HTMLDialogElement>;
  @ViewChild('dialogRemove') dialogRemove!:ElementRef<HTMLDialogElement>;

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.idCorso=param!=null?+param:null;
    if(this.idCorso!=null){
      this.corsoService.getCorsoById(this.idCorso).subscribe()
    }
    this.studenteService.getAllStudenti().subscribe({
      next:s=>{ this.studenti.set(s);


    }})
  }

  onDelete(corso:Corso){
    const conferma=confirm('Sicuro di voler eliminare '+this.corso().nome+"?");
    if(conferma){
    this.corsoService.deleteCorso(corso).subscribe({
      next:()=>this.route.navigate(['corsi'])
    })
  }}

  onBack(){
    this.location.back();
  }

  openDialog(){
    const dialogRef=this.dialog.open(UpCorsoComponent,{data:this.corso()});
    dialogRef.afterClosed().subscribe(()=>this.ngOnInit());
  }

  openAddDialog(){
    this.studente={} as Studente;
    this.dialogAdd.nativeElement.showModal();
  }

  closeAddDialog(){
    this.dialogAdd.nativeElement.close();
  }

  openRemoveDialog(){
    this.dialogRemove.nativeElement.showModal();
  }

  closeRemoveDialog(){
    this.dialogRemove.nativeElement.close();
  }

  addStudente(){
    this.corsoService.addStudente(this.corso(),this.studente).subscribe();
    this.dialogAdd.nativeElement.close();
  }

  removeStudente(){
    this.corsoService.removeStudente(this.corso(),this.studente).subscribe();
    this.dialogRemove.nativeElement.close();
  }
}
