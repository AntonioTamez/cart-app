import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { PrductService } from '../services/prduct.service';  
import { CartItem } from '../models/cartItem'; 
import { NavbarComponent } from './navbar/navbar.component'; 
import { RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;
  
  constructor(private sharingDataService: SharingDataService, private service: PrductService){}

  ngOnInit(): void { 
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []; 
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() : void {
    this.sharingDataService.productEventEmit.subscribe(product => {
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
  
      this.calculateTotal();
      this.saveSession();
    })

  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log('se ha ejecutado el evento onAddCart ' + id)
      this.items = this.items.filter(item => item.product.id !== id); 
      if(this.items.length === 0) {
        sessionStorage.removeItem('cart');
      } 
      this.calculateTotal();
      this.saveSession();
    });
  }

   calculateTotal() : void {
    this.total = this.items.reduce( (accumulator, item) => accumulator + item.quantity * item.product.price , 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
