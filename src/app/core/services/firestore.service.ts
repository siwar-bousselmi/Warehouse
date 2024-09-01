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
  saveWarehouse(warehouseData: any): Promise<void> {
    const id = this.firestore.createId(); // Generate a unique ID for the new warehouse
    return this.firestore.collection('warehouses').doc(id).set(warehouseData);
  }
  getWarehouses(): Observable<Element[]> {
    return this.firestore.collection<Element>('warehouses').valueChanges();
  }

  deleteWarehouse(id: string): Promise<void> {
    return this.firestore.collection('warehouses').doc(id).delete();
  }
}
