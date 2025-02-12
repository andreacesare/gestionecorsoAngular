import {Component, inject, signal} from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {Studente} from '../studenti/studente.model';
import {StudenteService} from '../studenti/studente.service';
import {MatDialogRef} from '@angular/material/dialog';

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
  private dialogRef=inject(MatDialogRef);

  onSubmit(form: NgForm){
    if(form.valid) {
    this.studenteService.saveStudente(this.newStudente()).subscribe();
    this.dialogRef.close();
  }}

  onBack(){
    this.dialogRef.close();
  }

}
