import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import { RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CorsoService} from './corso.service';
import {Docente} from '../docenti/docente.model';
import {Corso} from './corso.model';

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
    const sub = this.corsoService.getAllCorsi().subscribe({next: d => console.log(d)});
    this.destroy.onDestroy(() => sub.unsubscribe())

  }

  onCancel(corso: Corso) {
    const conferma = confirm('Sicuro di voler eliminare questo docente?');
    if (conferma) {
      const sub = this.corsoService.deleteCorso(corso).subscribe({
        next: d => console.log(d),
      })
    }
  }
}






