import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'corsi',
    loadComponent: () => import('./corsi/corso.component').then(m => m.CorsoComponent),
  },
  {
    path:'corsi/corso/:id',
    loadComponent:()=>import('./corsi/info-corso/info-corso.component').then(m => m.InfoCorsoComponent),
  },
  {
    path:'corsi/search-corso',
    loadComponent:()=>import('./corsi/search-corso/search-corso.component').then(m => m.SearchCorsoComponent),
  },
  {
    path:'docenti',
    loadComponent:()=>import('./docenti/docente.component').then(m => m.DocenteComponent),
  },
  {
   path:'docenti/docente/:id',
   loadComponent:()=>import('./docenti/info-doc/info-doc.component').then(m => m.InfoDocComponent),
  },
  {
    path:'studenti',
    loadComponent:()=>import('./studenti/studente.component').then(m => m.StudenteComponent),
  },
  {
    path:'studenti/studente/:id',
    loadComponent:()=>import('./studenti/info-studente/info-studente.component').then(m => m.InfoStudenteComponent),
  },

];
