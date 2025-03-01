import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Docente} from './docente.model';
import {Observable} from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private http=inject(HttpClient);
  docenti=signal<Docente[]>([]);
  docente=signal<Docente>({} as Docente);
  docentiFiltrati=signal<Docente[]>([]);


  getAllDocenti(){
    return this.http.get<Docente[]>("http://localhost:8080/docente").pipe(tap({
      next:d=> {
        this.docenti.set(d);
        this.docentiFiltrati.set(d);
      }
    }));
  }

  saveDocente(docente:Docente):Observable<Docente> {
    return  this.http.post<Docente>('http://localhost:8080/docente/saveDocente',docente).pipe(tap(
      savedoc=>{this.http.get<Docente>('http://localhost:8080/docente/getDocenteById/'+savedoc.id).subscribe(
      retdoc=>{this.docenti.update(d=>[...d,retdoc]);
      this.docentiFiltrati.set(this.docenti())}
    )
    }))
  }

  deleteDocente(docente:Docente){
    return this.http.delete('http://localhost:8080/docente/deleteDocente/'+docente.id).pipe(tap({
      next:()=>this.docenti.update(d=>d.filter(d=>d.id!==docente.id))
    }));
  }

  updateDocente(docente:Docente,docenteId:number | null){
    return this.http.put<Docente>('http://localhost:8080/docente/updateDocente/'+docenteId,docente).pipe(tap(
      savedoc=>this.http.get<Docente>('http://localhost:8080/docente/getDocenteById/'+savedoc.id).subscribe(
        ()=>this.getAllDocenti().subscribe(d=>this.docenti.set(d))
      )))
  }

  getDocenteById(id:number | null){
    return this.http.get<Docente>('http://localhost:8080/docente/getDocenteById/'+id).pipe(tap({
      next:d=>this.docente.set(d)
    }));
  }

  ricerca(text?:string){
    let params=new HttpParams();
    if(text){params=params.set('text',text);}
    return this.http.get<Docente[]>("http://localhost:8080/docente/ricerca",{params});
  }
}
