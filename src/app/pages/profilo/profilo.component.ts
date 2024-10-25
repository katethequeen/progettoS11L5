import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../interfaces/i-movies';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent implements OnInit {
  user!: iUser;
  favorites: iMovies[] = [];

  constructor(private authSvc: AuthService, private movieSvc: MoviesService) {}
  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (!user) return;

      this.user = user;
    });

    const userId = 1;
    this.movieSvc.getFavorites(userId).subscribe((favoriteMovies) => {
      const movieIds = favoriteMovies.map((f: { movieId: any }) => f.movieId);
      this.movieSvc.getMovies().subscribe((allMovies) => {
        this.favorites = allMovies.filter((movie) =>
          movieIds.includes(movie.id)
        );
      });
    });
  }
}
