import { Component } from '@angular/core';
import { UtentiService } from '../../services/utenti.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss',
})
export class UtentiComponent {
  users!: iUser[];
  constructor(private userSvc: UtentiService) {}
  ngOnInit() {
    this.userSvc.getAllUsers().subscribe((data) => {
      console.log('Users:', data);

      this.users = data;
    });
  }
}
