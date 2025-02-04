import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import { RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CorsoService} from './corso.service';


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

  ngOnInit() {
    const sub = this.corsoService.getAllCorsi().subscribe();
    this.destroy.onDestroy(() => sub.unsubscribe())

  }

}






