import { iUser } from './../interfaces/i-user';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {
  usersUrl: string = environment.users;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.usersUrl);
  }

  addFavorite(userId: number, movieId: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`).pipe(
      switchMap((user) => {
        console.log('Utente recuperato:', user); // Debug
        // Verifica che 'favorites' sia un array
        if (!user.favorites) {
          user.favorites = [];
        }
        user.favorites.push(movieId);
        console.log('Favorites aggiornati:', user.favorites); // Debug
        return this.http.put(`${this.usersUrl}/${userId}`, user, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        });
      })
    );
  }

  getFavorites(userId: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.usersUrl}/${userId}`)
      .pipe(map((user) => user.favorites));
  }

  removeFavorite(userId: number, movieId: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`).pipe(
      switchMap((user) => {
        user.favorites = user.favorites.filter(
          (fav: number) => fav !== movieId
        );
        return this.http.put(`${this.usersUrl}/${userId}`, user, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        });
      })
    );
  }
}
