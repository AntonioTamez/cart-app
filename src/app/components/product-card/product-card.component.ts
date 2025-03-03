import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: Product
  @Output() productEventEmit: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product) {
    this.productEventEmit.emit(product);
  }
}
