import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Corso} from './corso.model';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {
  private http=inject(HttpClient);
  corsi = signal<Corso[]>([]);
  corso=signal<Corso>({} as Corso);

  getAllCorsi(){
    return this.http.get<Corso[]>("http://localhost:8080/corso").pipe(tap({
      next:d=>this.corsi.set(d)
    }));
  }

  saveCorso(corso:Corso){
    return this.http.post<Corso>("http://localhost:8080/corso/saveCorso", corso).pipe(tap({
      next:c=>this.corsi.update(d=>[...d,c])
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
    return this.http.put<Corso>('http://localhost:8080/corso/updateCorso/'+corsoId,corso).pipe(tap(
      c=>this.http.get<Corso>('http://localhost:8080/corso/getCorsoById/'+c.id).subscribe(
        ()=>this.getAllCorsi().subscribe(c=>this.corsi.set(c))
      )))
  }

}
