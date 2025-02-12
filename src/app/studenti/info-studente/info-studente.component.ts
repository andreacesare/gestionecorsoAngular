import {Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
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
  id:number | null=null;
  clicked=false;
  corso:Corso={} as Corso;
  private dialog=inject(MatDialog);
  @ViewChild('myDialog') dialogRef!: ElementRef<HTMLDialogElement>;

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.id= param!=null?+param:null;
    if(this.id!=null){
      this.studenteService.getStudenteById(this.id).subscribe({
        next:()=>console.log(this.studente())
      })
    }
    this.corsoService.getAllCorsi().subscribe({
      next:c=>{
        this.corsi.set(c);
        const corsiNonSeguiti=this.corsi().filter(corso=>!this.studente().corsi.some(c=>c.id===corso.id));
        this.corsi.set(corsiNonSeguiti)
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
    this.dialog.open(UpStudenteComponent,{data:this.studente()});
  }

  dialogCorsi(){
    this.dialogRef.nativeElement.showModal();
  }

  closeDialog(){
    this.dialogRef.nativeElement.close();
  }


  onSubmit(){
    this.studenteService.addCorso(this.corso,this.studente()).subscribe({});
    this.dialogRef.nativeElement.close();
  }



}
