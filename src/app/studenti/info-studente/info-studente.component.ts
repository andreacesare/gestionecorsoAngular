import {Component, inject, OnInit} from '@angular/core';
import {StudenteService} from '../studente.service';
import {ActivatedRoute, Router, RouterModule, RouterOutlet} from '@angular/router';
import {Studente} from '../studente.model';

@Component({
  selector: 'app-info-studente',
  standalone: true,
  imports: [
    RouterOutlet,RouterModule
  ],
  templateUrl: './info-studente.component.html',
  styleUrl: './info-studente.component.css'
})
export class InfoStudenteComponent implements OnInit {
  private studenteService=inject(StudenteService);
  private route=inject(Router);
  private activeRoute=inject(ActivatedRoute);
  studente=this.studenteService.studente.asReadonly();
  id:number | null=null;

  ngOnInit() {
    const param=this.activeRoute.snapshot.paramMap.get('id');
    this.id= param!=null?+param:null;
    if(this.id!=null){
      this.studenteService.getStudenteById(this.id).subscribe({
        next:()=>console.log(this.studente())
      })
    }
  }

  onDelete(studente:Studente){
    this.studenteService.deleteStudente(studente).subscribe({
      next:()=>this.route.navigate(['/studenti'])
    });

  }

  onBack(){
    this.route.navigate(['/studenti']);
  }

}
