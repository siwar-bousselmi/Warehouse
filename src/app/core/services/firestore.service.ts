import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
    return this.firestore.collection('warehouses').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Element, 'id'>;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  deleteWarehouse(id: any): Promise<void> {
    return this.firestore.collection('warehouses').doc(id).delete();
  }
}
