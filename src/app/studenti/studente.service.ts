import {inject, Injectable, signal} from '@angular/core';
import {Studente} from './studente.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Docente} from '../docenti/docente.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {
  studenti=signal<Studente[]>([]);
  private http=inject(HttpClient);

  getAllStudenti(){
    return this.http.get<Studente[]>('http://localhost:8080/discente').pipe(tap({
      next:s=>this.studenti.set(s)
    }))
  }

  saveStudente(studente:Studente){
    return this.http.post<Studente>('http://localhost:8080/discente/saveDiscente',studente).pipe(tap(
      savedS=>this.http.get<Studente>('http://localhost:8080/discente/getDiscenteById/'+savedS.id).subscribe(
        updateS=>this.studenti.update(s=>[...s,updateS])
      ))
    )
  }
  deleteStudente(studente:Studente){
    return this.http.delete<Studente>('http://localhost:8080/discente/deleteDiscente/'+studente.id).pipe(tap({
      next:s=>this.studenti.update(s=>s.filter(d=>d.id!==studente.id))
      }
    ))
  }
}
