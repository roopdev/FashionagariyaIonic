import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { ProductProvider } from '../../providers/product';

import { SingleprodPage } from '../singleprod/singleprod';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
	products;
  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						private productService: ProductProvider) {
  	this.products = productService.getAllProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  toProd(id: string) {
    this.navCtrl.push(SingleprodPage, {id});
  }

}
