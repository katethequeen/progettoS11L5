import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iMovies } from '../interfaces/i-movies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl: string = environment.movies;
  favoriteUrl: string = environment.favorites;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<iMovies[]> {
    return this.http.get<iMovies[]>(this.moviesUrl);
  }

  addToFavorites(userId: number, movieId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.favoriteUrl, { userId, movieId }, { headers });
  }

  getFavorites(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.favoriteUrl}?userId=${userId}`);
  }
}
