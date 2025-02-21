import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http=inject(HttpClient);

  register(username:string, password:string){
    let params=new HttpParams();
    params=params.set('username',username);
    params=params.set('password',password);
    return this.http.post("http://localhost:8080/utente/register",{},{params});
}

  login(username:string, password:string){
    let params=new HttpParams();
    if(username)params=params.set('username',username);
    if(password)params=params.set('password',password);
    return this.http.post<{token:string}>("http://localhost:8080/utente/login",{},{params});
  }
}
