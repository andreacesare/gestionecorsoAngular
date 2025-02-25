import {Component, inject, OnInit, signal} from '@angular/core';
import {CorsoService} from '../corso.service';
import {FormsModule} from '@angular/forms';
import {Corso} from '../corso.model';
import {DocenteService} from '../../docenti/docente.service';
import {Router, RouterOutlet} from '@angular/router';
import {Docente} from '../../docenti/docente.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-up-corso',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterOutlet],
  templateUrl: './up-corso.component.html',
  styleUrl: './up-corso.component.css'
})
export class UpCorsoComponent implements OnInit {
  private corsoService=inject(CorsoService);
  private route=inject(Router);

  private docenteService=inject(DocenteService);
  docenti=signal<Docente[]>([]);
  corso=this.corsoService.corso.asReadonly();
  private dialog=inject(MatDialogRef);
  public data=inject(MAT_DIALOG_DATA);
  upCorso:Corso=this.data;

  ngOnInit() {
    console.log(this.upCorso.docente)
    this.docenteService.getAllDocenti().subscribe({
      next:d=>{this.docenti.set(d);
        this.upCorso.docente=this.docenti().find(d=>d.id==this.upCorso.docente.id)??this.upCorso.docente;
      }
    });

    console.log(this.upCorso.docente)
  }

  onSubmit(){
    this.corsoService.updateCorso(this.upCorso,this.corso().id).subscribe({
      next:()=>this.dialog.close()
    });

  }

  closeDialog(){
    this.dialog.close();
  }

}
