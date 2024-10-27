import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iMovies } from '../interfaces/i-movies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl: string = environment.movies;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<iMovies[]> {
    return this.http.get<iMovies[]>(this.moviesUrl);
  }
}
