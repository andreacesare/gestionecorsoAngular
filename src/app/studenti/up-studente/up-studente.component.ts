import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
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
  upStudente=signal<Studente>({} as Studente);
  studente=this.studenteService.studente.asReadonly();


  ngOnInit() {}



  onSubmit(){
    this.studenteService.updateStudente(this.upStudente(),this.studente().id).subscribe();
    this.route.navigate(['/studenti'])
  }

  onBack(){
    this.route.navigate(['/studenti']);

  }

}
