import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Warehouse } from '../models/warehouse.model';



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

  // Update a warehouse
  updateWarehouse(id: string, warehouse: Warehouse): Observable<void> {
    return new Observable(observer => {
      this.firestore.collection('warehouses').doc(id).update(warehouse)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getWarehouses(): Observable<Warehouse[]> {
    return this.firestore.collection('warehouses').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Warehouse, 'id'>;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  deleteWarehouse(id: any): Promise<void> {
    return this.firestore.collection('warehouses').doc(id).delete();
  }

  getWarehouseById(id: string): Observable<Warehouse | null> {
    return this.firestore.doc<Warehouse>(`warehouses/${id}`).valueChanges().pipe(
      map(data => data ? data : null),
      catchError(() => of(null))
    );
  }
}
