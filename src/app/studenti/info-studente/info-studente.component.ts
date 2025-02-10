import {Component, inject, OnInit, signal} from '@angular/core';
import {StudenteService} from '../studente.service';
import {ActivatedRoute, Router, RouterModule, RouterOutlet} from '@angular/router';
import {Studente} from '../studente.model';
import {FormsModule} from '@angular/forms';
import {CorsoService} from '../../corsi/corso.service';
import {Corso} from '../../corsi/corso.model';

@Component({
  selector: 'app-info-studente',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, FormsModule
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
    this.clicked=false;
  }

  onBackRoute(){
    this.route.navigate(['/studenti']);
  }

  onClick(){this.clicked=true;}

  onSubmit(){
    this.studenteService.addCorso(this.corso,this.studente()).subscribe({});
    this.clicked=false;
  }



}
