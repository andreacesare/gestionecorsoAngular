import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import { RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CorsoService} from './corso.service';
import {MatDialog} from '@angular/material/dialog';
import {NewCorsoComponent} from '../new-corso/new-corso.component';
import {FormsModule} from '@angular/forms';
import {Corso} from './corso.model';


@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent implements OnInit {
  private destroy = inject(DestroyRef);
  private corsoService = inject(CorsoService);
  corsi = this.corsoService.corsi.asReadonly();
  private dialog=inject(MatDialog);
  corsiFiltrati=signal<Corso[]>([]);
  corsoCercato='';
  data='';

  ngOnInit() {
    const sub = this.corsoService.getAllCorsi().subscribe({
      next:c=>this.corsiFiltrati.set(c)
    });
    this.destroy.onDestroy(() => sub.unsubscribe())

  }

  openDialog(){
    this.dialog.open(NewCorsoComponent);
  }

  searchCorso(){
    this.corsiFiltrati.set(this.corsi().filter(c=>c.nome.toLowerCase().includes(this.corsoCercato.toLowerCase())));
  }

  filterData(){
    this.corsiFiltrati.set(this.corsi().filter(c=>c.durata.toLowerCase().includes(this.data.toLowerCase())));
  }
}






