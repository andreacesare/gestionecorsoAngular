import { Routes } from '@angular/router';
import {authGuard} from './auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'corsi',
    loadComponent: () => import('./corsi/corso.component').then(m => m.CorsoComponent),
    canActivate:[authGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate:[authGuard]
  },
  {
    path:'corsi/corso/:id',
    loadComponent:()=>import('./corsi/info-corso/info-corso.component').then(m => m.InfoCorsoComponent),
    canActivate:[authGuard]
  },
  {
    path:'corsi/search-corso',
    loadComponent:()=>import('./corsi/search-corso/search-corso.component').then(m => m.SearchCorsoComponent),
    canActivate:[authGuard]
  },
  {
    path:'docenti',
    loadComponent:()=>import('./docenti/docente.component').then(m => m.DocenteComponent),
    canActivate:[authGuard]
  },
  {
   path:'docenti/docente/:id',
   loadComponent:()=>import('./docenti/info-doc/info-doc.component').then(m => m.InfoDocComponent),
    canActivate:[authGuard]
  },
  {
    path:'studenti',
    loadComponent:()=>import('./studenti/studente.component').then(m => m.StudenteComponent),
    canActivate:[authGuard]
  },
  {
    path:'studenti/studente/:id',
    loadComponent:()=>import('./studenti/info-studente/info-studente.component').then(m => m.InfoStudenteComponent),
    canActivate:[authGuard]
  },

];
