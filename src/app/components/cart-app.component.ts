import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { PrductService } from '../services/prduct.service';
import { CatalogComponent } from './catalog/catalog.component'; 
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { reduce } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[] = [];
 
  showCart: boolean = false;

  constructor(private service: PrductService){}

  ngOnInit(): void { 
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []; 
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
    console.log(this.items.length)
    if(this.items.length === 0) {
      sessionStorage.removeItem('cart');
    } 
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }

}
