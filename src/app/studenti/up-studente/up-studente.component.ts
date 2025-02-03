import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StudenteService} from '../studente.service';
import {Studente} from '../studente.model';

@Component({
  selector: 'app-up-studente',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './up-studente.component.html',
  styleUrl: './up-studente.component.css'
})
export class UpStudenteComponent implements OnInit {
  private route=inject(Router);
  private studenteService=inject(StudenteService);
  private activeRoute=inject(ActivatedRoute);
  upStudente=signal<Studente>({} as Studente);
  studente=signal<Studente>({} as Studente);
  idStudente:number | null=null;

  ngOnInit() {
    const id=this.activeRoute.snapshot.paramMap.get('id');
    this.idStudente=id!=null?+id:null;
    if(this.idStudente!=null){
      this.studenteService.getStudenteById(this.idStudente).subscribe({
        next:s=>this.studente.set(s)
      })
    }
    console.log(this.studente());
  }

  onSubmit(){
    this.studenteService.updateStudente(this.upStudente(),this.idStudente).subscribe();
    this.route.navigate(['/studenti'])
  }

  onBack(){
    this.route.navigate(['/studenti']);

  }

}
