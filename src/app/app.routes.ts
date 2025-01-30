import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path:'corsi',
    loadComponent:()=>import('./corsi/corso.component').then(m => m.CorsoComponent),
    children:[{
      path:'new-corso',
      loadComponent:()=>import('./new-corso/new-corso.component').then(m => m.NewCorsoComponent),
    }]
  },
  {
    path:'docenti',
    loadComponent:()=>import('./docenti/docente.component').then(m => m.DocenteComponent),
    children:[{
      path:'new-docente',
      loadComponent:()=>import('./new-docente/new-docente.component').then(m=>m.NewDocenteComponent),
    }]
  },
  {
    path:'studenti',
    loadComponent:()=>import('./studenti/studente.component').then(m => m.StudenteComponent),
    children:[{
      path:'new-studente',
      loadComponent:()=>import('./new-studente/new-studente.component').then(m => m.NewStudenteComponent),
    }]
  }
];
