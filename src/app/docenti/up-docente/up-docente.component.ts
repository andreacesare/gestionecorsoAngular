import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Docente} from '../docente.model';
import {DocenteService} from '../docente.service';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-up-docente',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './up-docente.component.html',
  styleUrl: './up-docente.component.css'
})
export class UpDocenteComponent implements OnInit{
  private route=inject(Router);
  private activeRoute= inject(ActivatedRoute);
  private docenteService=inject(DocenteService);
  upDocente = signal<Docente>({} as Docente);
  docente=this.docenteService.docente.asReadonly();
  docenteId:number | null=null;

  ngOnInit(){
    const idParam = this.activeRoute.snapshot.paramMap.get('id');
    this.docenteId = idParam ? +idParam : null;
    if(this.docenteId!=null) {
      this.docenteService.getDocenteById(this.docenteId).subscribe();
    }
  }

  onSubmit(form:NgForm){
      this.docenteService.updateDocente(this.upDocente(),this.docenteId).subscribe();

      this.route.navigate(['/docenti']);
    }

  onBack(){
    this.route.navigate(['/docenti']);
  }


}
