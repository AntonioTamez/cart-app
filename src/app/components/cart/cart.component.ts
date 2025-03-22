import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(private sharingDataService: SharingDataService, private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  items: CartItem[] = [];
  total: number = 0;


  onDeleteCart(id: number) {
     this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
