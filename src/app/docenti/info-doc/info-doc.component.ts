import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Docente } from '../docente.model';
import {DocenteService} from '../docente.service';

@Component({
  selector: 'app-info-doc',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './info-doc.component.html',
  styleUrl: './info-doc.component.css'
})
export class InfoDocComponent implements OnInit {
  private activeRoute=inject(ActivatedRoute);
  private route=inject(Router);
  private docenteService=inject(DocenteService);
  docente=signal<Docente>({} as Docente);
  idDocente:number | null=null;

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.idDocente=param!=null?+param:null;
    if(this.idDocente!=null){
      this.docenteService.getDocenteById(this.idDocente).subscribe({
        next: d=>{this.docente.set(d);
        console.log(this.docente());}
      })

    }

  }

  onDelete(docente:Docente){
    const conferma = confirm('Sicuro di voler eliminare questo docente?');
      if(conferma){
      console.log(docente.nome+" "+docente.cognome+" ELIMINATO!")
      console.log(docente);
      this.docenteService.deleteDocente(docente).subscribe({
        next: ()=>{this.route.navigate(['docenti']);}
      });

    }}

  onBack(){
    this.route.navigate(['docenti']);
  }

}
