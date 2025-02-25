import {Component, inject, OnInit, signal} from '@angular/core';
import { Router} from '@angular/router';
import {Docente} from '../docente.model';
import {DocenteService} from '../docente.service';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-up-docente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './up-docente.component.html',
  styleUrl: './up-docente.component.css'
})
export class UpDocenteComponent implements OnInit{
  private route=inject(Router);
  private docenteService=inject(DocenteService);

  docente=this.docenteService.docente;
  private dialog=inject(MatDialogRef);
  public data=inject(MAT_DIALOG_DATA);
  upDocente:Docente = this.data;

  ngOnInit(){}

  onSubmit(){
      this.docenteService.updateDocente(this.upDocente,this.docente().id).subscribe({
        next:()=>{this.docenteService.getDocenteById(this.docente().id).subscribe(docente=>{this.docente.set(docente)});
        this.dialog.close();}
      });
  }

  closeDialog(){
    this.dialog.close();
  }


}
