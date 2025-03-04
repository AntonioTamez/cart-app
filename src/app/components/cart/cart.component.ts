import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter

  
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
