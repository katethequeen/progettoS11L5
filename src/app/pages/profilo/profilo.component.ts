import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iMovies } from '../../interfaces/i-movies';
import { UtentiService } from '../../services/utenti.service';
import { MoviesService } from '../../services/movies.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent implements OnInit {
  user!: iUser;
  favorites: iMovies[] = [];

  constructor(
    private authSvc: AuthService,
    private userSvc: UtentiService,
    private movieSvc: MoviesService
  ) {}
  ngOnInit() {
    this.authSvc.user$.subscribe({
      next: (user) => {
        if (!user) return;
        this.user = user;
        this.loadFavorites(user.id);
      },
      error: (err) => {
        console.error('Errore nel caricamento utente:', err);
      },
      complete: () => {
        console.log('Caricamento utente completato');
      },
    });
  }

  loadFavorites(userId: number) {
    this.userSvc.getFavorites(userId).subscribe({
      next: (favoriteIds?: number[]) => {
        console.log('Valore di favoriteIds:', favoriteIds);
        if (!favoriteIds) {
          console.log('favoriteIds è undefined');
          return;
        }

        this.movieSvc.getMovies().subscribe({
          next: (allMovies) => {
            if (!allMovies) {
              console.log('allMovies è undefined');
              return;
            }

            this.favorites = allMovies.filter((movie) =>
              favoriteIds.includes(movie.movieId)
            );
          },
          error: (err) => {
            console.error('Errore nel caricamento dei film:', err);
          },
          complete: () => {
            console.log('Caricamento dei film completato');
          },
        });
      },
      error: (err) => {
        console.error('Errore nel caricamento dei favoriti:', err);
      },
      complete: () => {
        console.log('Caricamento dei favoriti completato');
      },
    });
  }

  removeFromFavorites(movieId: number) {
    const userId = this.authSvc.getUserId();
    if (userId === null) {
      console.log('Utente non loggato');
      return;
    }
    this.userSvc.removeFavorite(userId, movieId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(
          (movie) => movie.movieId !== movieId
        );
      },
      error: (err) => {
        console.error('Errore nella rimozione del favorito:', err);
      },
      complete: () => {
        console.log('Rimozione del favorito completata');
      },
    });
  }
}
