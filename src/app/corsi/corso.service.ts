import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Corso} from './corso.model';
import {tap} from 'rxjs/operators';
import {Studente} from '../studenti/studente.model';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {
  private http=inject(HttpClient);
  corsi = signal<Corso[]>([]);
  corso=signal<Corso>({} as Corso);
  corsiFiltrati=signal<Corso[]>([]);

  getAllCorsi(){
    return this.http.get<Corso[]>("http://localhost:8080/corso").pipe(tap({
      next:d=>{this.corsi.set(d);
        this.corsiFiltrati.set(d);}
    }));
  }

  saveCorso(corso:Corso){
    return this.http.post<Corso>("http://localhost:8080/corso/saveCorso", corso).pipe(tap({
      next:c=> {
        this.corsi.update(d => [...d, c]);
      this.corsiFiltrati.set(this.corsi());}
    }));
  }

  deleteCorso(corso:Corso){
    return this.http.delete<Corso>(`http://localhost:8080/corso/deleteCorso/${corso.id}`).pipe(tap({
      next:()=>this.corsi.update(d=>d.filter(d=>d.id!==corso.id))
    }))
  }

  getCorsoById(id:number | null){
    return this.http.get<Corso>('http://localhost:8080/corso/getCorsoById/'+id).pipe(tap({
      next:c=>this.corso.set(c)
    }));
  }

  updateCorso(corso:Corso,corsoId:number | undefined){
    return this.http.put<Corso>('http://localhost:8080/corso/updateCorso/'+corsoId,corso).pipe(tap({
      next:c=>this.http.get<Corso>('http://localhost:8080/corso/getCorsoById/'+c.id).pipe(tap({
        next:c=>this.corso.set(c)
      })).subscribe(
        ()=>this.getAllCorsi().subscribe(c=>this.corsi.set(c))
      )}))
  }

  addStudente(corso:Corso,studente:Studente){
    return this.http.post<Corso>('http://localhost:8080/corso/'+corso.id+'/addStudente/'+studente.id,studente).pipe(tap({
      next:s=>this.corso.set(s)
    }))
  }

  removeStudente(corso:Corso,studente:Studente){
    return this.http.post<Corso>('http://localhost:8080/corso/'+corso.id+'/removeStudente/'+studente.id,studente).pipe(tap({
      next:s=>this.corso.set(s)
    }))
  }

}
