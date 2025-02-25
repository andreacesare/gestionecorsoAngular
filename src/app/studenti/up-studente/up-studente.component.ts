import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {StudenteService} from '../studente.service';
import {Studente} from '../studente.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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

  studente=this.studenteService.studente.asReadonly();
  private dialog=inject(MatDialogRef);
  data=inject(MAT_DIALOG_DATA);
  upStudente=this.data;

  ngOnInit() {}



  onSubmit(){
    this.studenteService.updateStudente(this.upStudente,this.studente().id).subscribe();
    this.dialog.close();
  }

  onBack(){
    this.dialog.close();

  }

}
