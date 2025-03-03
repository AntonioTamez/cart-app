import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { PrductService } from '../services/prduct.service';
import { CatalogComponent } from './catalog/catalog.component'; 
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-cart-app',
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];
  items: CartItem[] = [];

  constructor(private service: PrductService){}

  ngOnInit(): void { 
    this.products = this.service.findAll();
  }
}
