import {Component, inject, OnInit, signal} from '@angular/core';
import {CorsoService} from '../corso.service';
import {FormsModule} from '@angular/forms';
import {Corso} from '../corso.model';
import {DocenteService} from '../../docenti/docente.service';
import { Router} from '@angular/router';
import {Docente} from '../../docenti/docente.model';

@Component({
  selector: 'app-up-corso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './up-corso.component.html',
  styleUrl: './up-corso.component.css'
})
export class UpCorsoComponent implements OnInit {
  private corsoService=inject(CorsoService);
  private route=inject(Router);
  upCorso=signal<Corso>({} as Corso);
  private docenteService=inject(DocenteService);
  docenti=signal<Docente[]>([]);
  corso=this.corsoService.corso.asReadonly();

  ngOnInit() {
    this.docenteService.getAllDocenti().subscribe({
      next:d=>this.docenti.set(d)
    });

  }

  onSubmit(){
    this.corsoService.updateCorso(this.upCorso(),this.corso().id).subscribe({
      next:()=>this.route.navigate(['/corsi'])
    });

  }

  onBack(){
    this.route.navigate(['/corsi/corso/'+this.corso().id]);
  }

}
