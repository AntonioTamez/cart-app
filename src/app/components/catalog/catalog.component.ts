import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {

  products: Product[] = []

  constructor(private sharingDataService: SharingDataService, private router: Router) {
    this.products = this.router.getCurrentNavigation()?.extras.state!['products']
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmit.emit(product);
  }
}
