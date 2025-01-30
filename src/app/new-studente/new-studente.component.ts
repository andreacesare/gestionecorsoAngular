import {Component, inject, signal} from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {Studente} from '../studenti/studente.model';
import {StudenteService} from '../studenti/studente.service';

@Component({
  selector: 'app-new-studente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-studente.component.html',
  styleUrl: './new-studente.component.css'
})
export class NewStudenteComponent {
  newStudente=signal<Studente>({} as Studente);
  private studenteService=inject(StudenteService);
  private route=inject(Router);

  onSubmit(form: NgForm){
    console.log(form.value);
    this.studenteService.saveStudente(this.newStudente()).subscribe();
    this.route.navigate(['/studenti']);
  }

  onBack(){
    this.route.navigate(['/studenti']);
  }

}
