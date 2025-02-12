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
    },
    ]
  },{
    path:'corsi/corso/:id',
    loadComponent:()=>import('./corsi/info-corso/info-corso.component').then(m => m.InfoCorsoComponent),
    children:[
      {
        path:'up-corso',
        loadComponent:()=>import('./corsi/up-corso/up-corso.component').then(m => m.UpCorsoComponent),
      }
    ]
  },
  {
    path:'docenti',
    loadComponent:()=>import('./docenti/docente.component').then(m => m.DocenteComponent),
     children:[]
  },
  {
   path:'docenti/docente/:id',
   loadComponent:()=>import('./docenti/info-doc/info-doc.component').then(m => m.InfoDocComponent),
    children:[
      {
        path:'up-docente',
        loadComponent:()=>import('./docenti/up-docente/up-docente.component').then(m => m.UpDocenteComponent),
      }
    ]
  },
  {
    path:'studenti',
    loadComponent:()=>import('./studenti/studente.component').then(m => m.StudenteComponent),
    children:[{
      path:'new-studente',
      loadComponent:()=>import('./new-studente/new-studente.component').then(m => m.NewStudenteComponent),
    },
    ]
  },
  {
    path:'studenti/studente/:id',
    loadComponent:()=>import('./studenti/info-studente/info-studente.component').then(m => m.InfoStudenteComponent),
    children:[
      {
        path:'up-studente',
        loadComponent:()=>import('./studenti/up-studente/up-studente.component').then(m => m.UpStudenteComponent),

      }
    ]
  },
  { path: '', redirectTo: '/docenti', pathMatch: 'full' }
];
