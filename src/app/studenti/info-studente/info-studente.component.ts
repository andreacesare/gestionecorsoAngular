import {Component, computed, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {StudenteService} from '../studente.service';
import {ActivatedRoute, Router, RouterModule, RouterOutlet} from '@angular/router';
import {Studente} from '../studente.model';
import {FormsModule} from '@angular/forms';
import {CorsoService} from '../../corsi/corso.service';
import {Corso} from '../../corsi/corso.model';
import {DatePipe} from "@angular/common";
import {MatDialog} from '@angular/material/dialog';
import {UpDocenteComponent} from '../../docenti/up-docente/up-docente.component';
import {UpStudenteComponent} from '../up-studente/up-studente.component';
import {CorsoComponent} from '../../corsi/corso.component';

@Component({
  selector: 'app-info-studente',
  standalone: true,
    imports: [
        RouterOutlet, RouterModule, FormsModule, DatePipe
    ],
  templateUrl: './info-studente.component.html',
  styleUrl: './info-studente.component.css'
})
export class InfoStudenteComponent implements OnInit {
  private studenteService=inject(StudenteService);
  private corsoService=inject(CorsoService);
  private route=inject(Router);
  private activeRoute=inject(ActivatedRoute);
  studente=this.studenteService.studente.asReadonly();
  corsi=signal<Corso[]>([]);
  corsiNonSeguiti=computed(()=>this.corsi().filter(corso=>!this.studente().corsi.some(c=>c.id===corso.id)));
  id:number | null=null;
  corso:Corso={} as Corso;
  private dialog=inject(MatDialog);
  @ViewChild('addDialog') addDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('removeDialog') removeDialog!: ElementRef<HTMLDialogElement>;
  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.id= param!=null?+param:null;
    if(this.id!=null){
      this.studenteService.getStudenteById(this.id).subscribe()
    }
    this.corsoService.getAllCorsi().subscribe({
      next:c=>{
        this.corsi.set(c);


      }
    });
  }

  onDelete(studente:Studente){
    const conferma=confirm('Sicuro di voler eliminar?'+studente.nome+" "+studente.cognome+" ?");
    if(conferma) {
      this.studenteService.deleteStudente(studente).subscribe({
        next: () => this.route.navigate(['/studenti'])
      });
    }
  }

  onBack(){
    this.route.navigate(['studenti']);
  }

  openDialog(){
    const dialogRef=this.dialog.open(UpStudenteComponent,{data:this.studente()});
    dialogRef.afterClosed().subscribe(()=>this.ngOnInit());
  }

  openAddDialog(){
    this.corso={} as Corso;
    this.addDialog.nativeElement.showModal();
  }

  closeAddDialog(){
    this.addDialog.nativeElement.close();
  }

  openRemoveDialog(){
    this.removeDialog.nativeElement.showModal();
  }

  closeRemoveDialog(){
    this.removeDialog.nativeElement.close();
  }

  addCorso(){
    this.studenteService.addCorso(this.corso,this.studente()).subscribe({});
    this.addDialog.nativeElement.close();
  }

  removeCorso(){
    this.studenteService.removeCorso(this.corso,this.studente()).subscribe({});
    this.removeDialog.nativeElement.close();
  }



}
