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
  showPassword=false;



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

  onShowPassword(){
    this.showPassword=!this.showPassword;
  }

}
