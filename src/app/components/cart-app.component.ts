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

  onAddCart(product: Product) : void {
    const hasItem = this.items.find(item => item.product.id  === product.id)

    if(hasItem) {
      this.items = this.items.map(item => {
        if(item.product.id === product.id) {
          return  {
            ... item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: {... product }, quantity: 1 }];
    }
  }

  onDeleteCart(id: number) {
    this.items = this.items.filter(item => item.product.id !== id);
  }

}
