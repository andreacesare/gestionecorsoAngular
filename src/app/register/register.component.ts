import {Component, inject} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private loginService=inject(LoginService);
  private route=inject(Router);
  username:string='';
  password:string='';
  message='';
  error='';
  showPassword=false;


  iscrivi(form:NgForm) {
    if (form.valid) {
      this.loginService.register(this.username, this.password).subscribe({
        next: () => {
          this.message = 'Utente creato con successo';
          form.resetForm();
          setTimeout(() => {
            this.message = '';
            this.route.navigate(['login']);
          }, 1000);


        },
        error: () => {
          this.error = 'Utente gia esistente';
          form.resetForm();
          setTimeout(() => {
            this.error = '';
          }, 2000)
        }
      });

    }
  }

  onShowPassword(){
    this.showPassword=!this.showPassword;
  }

  onBack(){
    this.route.navigate(['login']);
  }


}
