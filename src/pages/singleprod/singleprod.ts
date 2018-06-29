import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductProvider } from '../../providers/product';


@IonicPage()
@Component({
  selector: 'page-singleprod',
  templateUrl: 'singleprod.html',
})
export class SingleprodPage {
	id: string;
	product;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductProvider) {
  	this.id = navParams.get("id");
  	console.log(this.id);
  	this.product = productService.getSingleProduct(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleprodPage');
  }

}
