import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {LoginService} from './login.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService=inject(LoginService);
  private route=inject(Router);
  username:string='';
  password:string='';
  message='';
  error='';

  iscrivi(form:NgForm){

    this.loginService.register(this.username,this.password).subscribe({
      next:()=> {
        this.message = 'Utente creato con successo';
        form.resetForm();
        setTimeout(()=>{
          this.message = '';
        },3000)

      }});
  }

  login(form:NgForm){
  this.loginService.login(this.username,this.password).subscribe({
    next:r=>{
      localStorage.setItem('token',r.token);
      this.message='Login Riuscito';
      form.resetForm();
      setTimeout(()=>{this.route.navigate(['home'])},1500);
    },
    error: () => {
      this.error = 'Credenziali errate';
      form.resetForm();
      setTimeout(()=>{this.error='';},2000);
    }
  });
  }

}
