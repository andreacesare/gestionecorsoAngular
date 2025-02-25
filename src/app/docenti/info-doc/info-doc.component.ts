import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Docente } from '../docente.model';
import {DocenteService} from '../docente.service';
import {MatDialog} from '@angular/material/dialog';
import {UpDocenteComponent} from '../up-docente/up-docente.component';
import {CorsoService} from '../../corsi/corso.service';


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
  private corsoService=inject(CorsoService);
  docente=this.docenteService.docente.asReadonly();
  corsi=this.corsoService.corsi.asReadonly();

  idDocente:number | null=null;
  private dialog=inject(MatDialog);

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.idDocente=param!=null?+param:null;
    if(this.idDocente!=null){
      this.docenteService.getDocenteById(this.idDocente).subscribe()

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

  openDialog(){
    const dialogRef=this.dialog.open(UpDocenteComponent,{data:this.docente()});
    dialogRef.afterClosed().subscribe(()=>this.ngOnInit())
  }

}
