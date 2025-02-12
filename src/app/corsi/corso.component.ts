import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import { RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CorsoService} from './corso.service';
import {MatDialog} from '@angular/material/dialog';
import {NewCorsoComponent} from '../new-corso/new-corso.component';


@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent implements OnInit {
  private destroy = inject(DestroyRef);
  private corsoService = inject(CorsoService);
  corsi = this.corsoService.corsi.asReadonly();
  private dialog=inject(MatDialog);

  ngOnInit() {
    const sub = this.corsoService.getAllCorsi().subscribe();
    this.destroy.onDestroy(() => sub.unsubscribe())

  }

  openDialog(){
    this.dialog.open(NewCorsoComponent);
  }

}






