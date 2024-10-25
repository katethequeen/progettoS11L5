import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formData: Partial<iUser> = {};

  constructor(private authSvc: AuthService, private router: Router) {}

  register() {
    console.log('Dati per la registrazione', this.formData);

    this.authSvc.register(this.formData).subscribe((res) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
