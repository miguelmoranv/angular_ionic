import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Producto } from '../modelos/producto';
import { ProductosService } from '../servicio/productos.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  productList: Producto[] = [];
  loader!: HTMLIonLabelElement;
  open = true;

  constructor(private productService: ProductosService, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    console.log('view did enter 2');
  }

  ionViewDidEnter() {
    console.log('view did enter 2');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (items) => {
        this.productList = items;
        console.log(this.productList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}