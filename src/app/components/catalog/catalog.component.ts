import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component'; 
import { SharingDataService } from '../../services/sharing-data.service';
import { PrductService } from '../../services/prduct.service';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[]

  constructor(
    private productService: PrductService,  
    private sharingDataService: SharingDataService) {}

  ngOnInit(): void {    
      this.products = this.productService.findAll(); 
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmit.emit(product);
  }
}

