import { Component } from '@angular/core';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formData: iLoginRequest = {
    email: '',
    password: '',
  };

  constructor(private authSvc: AuthService, private router: Router) {}

  login() {
    console.log('Dati del Form', this.formData);
    this.authSvc.login(this.formData).subscribe({
      next: (data) => {
        console.log('Accesso avvenuto con successo', data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Errore durante il login', err);
      },
      complete: () => {
        console.log('Login completato');
      },
    });
  }
}
