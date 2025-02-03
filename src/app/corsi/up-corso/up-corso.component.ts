import {Component, inject, OnInit, signal} from '@angular/core';
import {CorsoService} from '../corso.service';
import {FormsModule, NgForm} from '@angular/forms';
import {Corso} from '../corso.model';
import {DocenteService} from '../../docenti/docente.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  private activeRoute=inject(ActivatedRoute);
  upCorso=signal<Corso>({} as Corso);
  private docenteService=inject(DocenteService);
  docenti=signal<Docente[]>([]);
  corso=this.corsoService.corso.asReadonly();
  corsoId:number | null=null;

  ngOnInit() {
    this.docenteService.getAllDocenti().subscribe({
      next:d=>this.docenti.set(d)
    });
    const id=this.activeRoute.snapshot.paramMap.get('id');
    this.corsoId=id!=null?+id:null;
    if(this.corsoId!=null){
      this.corsoService.getCorsoById(this.corsoId).subscribe();
      console.log(this.corso());
    }

  }

  onSubmit(form:NgForm){
    this.corsoService.updateCorso(this.upCorso(),this.corsoId).subscribe();
    this.route.navigate(['/corsi']);
  }

  onBack(){
    this.route.navigate(['/corsi']);
  }

}
