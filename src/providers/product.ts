import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';

@Injectable()
export class ProductProvider {
	categoryCollection: AngularFirestoreCollection<any>;
	productCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    console.log('Hello ProductProvider Provider');
    this.categoryCollection = afs.collection('categories');
    this.productCollection = afs.collection('products');
  }

  getAllCategories() {
  	return this.categoryCollection.snapshotChanges().pipe(
  			map(actions => actions.map(a => {
  				const data = a.payload.doc.data();
  				const id = a.payload.doc.id;
  				return { id, ...data };
  			}))
  		);
  }

  getAllProducts() {
  	return this.productCollection.snapshotChanges().pipe(
  			map(actions => actions.map(a => {
  				const data = a.payload.doc.data();
  				const id = a.payload.doc.id;
  				return { id, ...data };
  			}))
  		);
  }

  getSingleProduct(id) {
  	return this.productCollection.doc(id).valueChanges();
  }

}
