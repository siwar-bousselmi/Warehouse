import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  saveUser(data: any): Promise<void> {
    return this.firestore.collection('users').doc(data.email).set(data);
  }
  // Méthode pour obtenir des données d'une collection
  getCollection<T>(path: string): Observable<T[]> {
    return this.firestore.collection<T>(path).valueChanges();
  }

  // Méthode pour ajouter un document à une collection
  addDocument<T>(path: string, data: T): Promise<void> {
    const id = this.firestore.createId(); // Crée un ID unique
    return this.firestore.collection<T>(path).doc(id).set(data);
  }

  // Méthode pour obtenir un document spécifique
  getDocument<T>(path: string, id: string): Observable<T | undefined> {
    return this.firestore.collection<T>(path).doc(id).valueChanges();
  }

  // Méthode pour mettre à jour un document
  updateDocument<T>(path: string, id: string, data: Partial<T>): Promise<void> {
    return this.firestore.collection<T>(path).doc(id).update(data);
  }

  // Méthode pour supprimer un document
  deleteDocument(path: string, id: string): Promise<void> {
    return this.firestore.collection(path).doc(id).delete();
  }
}
