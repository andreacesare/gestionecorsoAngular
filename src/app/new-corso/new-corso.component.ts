import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Corso} from '../corsi/corso.model';
import {FormsModule, NgForm} from '@angular/forms';
import {DocenteService} from '../docenti/docente.service';
import {Docente} from '../docenti/docente.model';
import {CorsoService} from '../corsi/corso.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-corso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-corso.component.html',
  styleUrl: './new-corso.component.css'
})
export class NewCorsoComponent implements OnInit {
  private route=inject(Router);
  private docenteService=inject(DocenteService);
  private corsoService=inject(CorsoService);
  newCorso=signal<Corso>({} as Corso);
  docenti=signal<Docente[]>([]);
  private dialogRef=inject(MatDialogRef<NewCorsoComponent>);

  ngOnInit() {
    this.docenteService.getAllDocenti().subscribe({
      next:d=>this.docenti.set(d)
    });
  }

  onSubmit(form:NgForm){
    if(form.valid){
    console.log(this.newCorso());
    this.corsoService.saveCorso(this.newCorso()).subscribe({next:()=>console.log(this.newCorso())});
    this.dialogRef.close();
   } else{console.log('error bro')}
    }

   onBack(){
    this.dialogRef.close();
   }
}
