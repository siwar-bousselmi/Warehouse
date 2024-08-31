import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import AngularFireAuth
import { from, Observable } from 'rxjs'; // Import des types RxJS
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Méthode pour se connecter
  login(email: string, password: string): Observable<void> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(userCredential => {
        console.log('User logged in:', userCredential.user);
      }),
      catchError(error => {
        console.error('Login error:', error.message);
        throw error;
      })
    );
  }

  // Méthode pour s'inscrire
  register(email: string, password: string): Observable<void> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      map(userCredential => {
        console.log('User registered:', userCredential.user);
      }),
      catchError(error => {
        console.error('Registration error:', error.message);
        throw error;
      })
    );
  }

  // Méthode pour se déconnecter
  logout(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      map(() => {
        console.log('User signed out');
      }),
      catchError(error => {
        console.error('Sign-out error:', error.message);
        throw error;
      })
    );
  }
}
