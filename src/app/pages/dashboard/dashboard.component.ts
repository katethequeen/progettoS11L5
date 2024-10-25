import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../interfaces/i-movies';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  movies!: iMovies[];
  userId: number | null = null;
  constructor(private movieSvc: MoviesService, private authSvc: AuthService) {}
  ngOnInit() {
    this.movieSvc.getMovies().subscribe((data) => {
      console.log('Dati film:', data);

      this.movies = data;
    });
    this.authSvc.user$.subscribe((user) => {
      this.userId = user ? user.id : null;
    });
  }

  addToFavorites(movieId: number) {
    if (this.userId !== null) {
      this.movieSvc.addToFavorites(this.userId, movieId).subscribe((res) => {
        console.log('Film aggiunto ai preferiti:', res);
      });
    } else {
      console.log('Utente non loggato');
    }
  }
}
