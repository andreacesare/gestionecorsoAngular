import {Component, inject, OnInit} from '@angular/core';
import {Corso} from '../corso.model';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

import {CorsoService} from '../corso.service';

@Component({
  selector: 'app-info-corso',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './info-corso.component.html',
  styleUrl: './info-corso.component.css'
})
export class InfoCorsoComponent implements OnInit {
  private activeRoute=inject(ActivatedRoute);
  private route=inject(Router);
  private corsoService=inject(CorsoService);
  corso=this.corsoService.corso.asReadonly();
  idCorso:number | null=null;

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.idCorso=param!=null?+param:null;
    if(this.idCorso!=null){
      this.corsoService.getCorsoById(this.idCorso).subscribe({
        next:()=>console.log(this.corso())
      })}
  }

  onDelete(corso:Corso){
    const conferma=confirm('Sicuro di voler eliminare '+this.corso().nome+"?");
    if(conferma){
    this.corsoService.deleteCorso(corso).subscribe({
      next:()=>this.route.navigate(['corsi'])
    })
  }}

  onBack(){
    this.route.navigate(['corsi']);
  }
}
