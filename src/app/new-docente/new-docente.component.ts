import {Component, inject, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Docente} from '../docenti/docente.model';
import {DocenteService} from '../docenti/docente.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-docente',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-docente.component.html',
  styleUrl: './new-docente.component.css'
})
export class NewDocenteComponent  {

  newDocente = signal<Docente>({} as Docente);
  private docenteService=inject(DocenteService);


  private dialogRef=inject(MatDialogRef);

  onSubmit(form:NgForm){
    if(form.valid) {
      this.docenteService.saveDocente(this.newDocente()).subscribe();
      this.dialogRef.close();

    }else{console.log('error bro')}
  }
  onBack(){
    this.dialogRef.close();
  }


}
