import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Docente} from './docente.model';
import {Observable} from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private http=inject(HttpClient);
  docenti=signal<Docente[]>([]);


  getAllDocenti(){
    return this.http.get<Docente[]>("http://localhost:8080/docente").pipe(tap({
      next:d=>this.docenti.set(d)
    }));
  }
  saveDocente(docente:Docente):Observable<Docente> {
    return  this.http.post<Docente>('http://localhost:8080/docente/saveDocente',docente).pipe(tap(
      savedoc=>{this.http.get<Docente>('http://localhost:8080/docente/getDocenteById/'+savedoc.id).subscribe(
      retdoc=>this.docenti.update(d=>[...d,retdoc])
    )
    }))
  }

  deleteDocente(docente:Docente){
    return this.http.delete('http://localhost:8080/docente/deleteDocente/'+docente.id).pipe(tap({
      next:d=>this.docenti.update(d=>d.filter(d=>d.id!==docente.id))
    }));
  }
}
