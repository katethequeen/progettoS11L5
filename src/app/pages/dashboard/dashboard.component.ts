import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../interfaces/i-movies';
import { AuthService } from '../../auth/auth.service';
import { UtentiService } from '../../services/utenti.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  movies!: iMovies[];
  constructor(
    private movieSvc: MoviesService,
    private authSvc: AuthService,
    private userSvc: UtentiService
  ) {}
  ngOnInit() {
    this.movieSvc.getMovies().subscribe((data) => {
      console.log('Dati film:', data);

      this.movies = data;
    });
  }

  addToFavorites(movieId: number) {
    const userId = this.authSvc.getUserId();
    if (userId === null) {
      console.log('Utente non loggato o token mancante');
      return;
    }
    this.userSvc.addFavorite(userId, movieId).subscribe({
      next: () => {
        console.log('Film aggiunto ai favoriti:', movieId);
      },
      error: (err) => {
        console.error("Errore durante l'aggiunta ai preferiti:", err);
      },
      complete: () => {
        console.log('Aggiunta ai preferiti completata');
      },
    });
  }
}
