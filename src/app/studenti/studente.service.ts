import {inject, Injectable, signal} from '@angular/core';
import {Studente} from './studente.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Corso} from '../corsi/corso.model';


@Injectable({
  providedIn: 'root'
})
export class StudenteService {
  studenti=signal<Studente[]>([]);
  studente=signal<Studente>({} as Studente);
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
      next:()=>this.studenti.update(s=>s.filter(d=>d.id!==studente.id))
      }
    ))
  }

  getStudenteById(id:number | null){
    return this.http.get<Studente>('http://localhost:8080/discente/getDiscenteById/'+id).pipe(tap(
      s=>this.studente.set(s)
    ))
  }

  updateStudente(studente:Studente,id:number | null){
    return this.http.put<Studente>('http://localhost:8080/discente/updateDiscente/'+id,studente).pipe(tap(
      ()=>{this.getAllStudenti().subscribe(s=>this.studenti.set(s))
      this.getStudenteById(studente.id).subscribe(s=>this.studente.set(s))
      }
    ))
  }

  addCorso(corso:Corso,studente:Studente){
    return this.http.post<Studente>('http://localhost:8080/discente/'+studente.id+'/addCorso/'+corso.id,corso).pipe(tap({
      next:s=>this.studente.set(s)
    }))
  }


}
