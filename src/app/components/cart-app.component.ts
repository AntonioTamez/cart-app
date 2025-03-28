import { Component, OnInit } from '@angular/core'; 
import { PrductService } from '../services/prduct.service';  
import { CartItem } from '../models/cartItem'; 
import { NavbarComponent } from './navbar/navbar.component'; 
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{
 

  items: CartItem[] = [];

  total: number = 0;
  
  constructor(
    private router: Router,
    private sharingDataService: SharingDataService, 
    private service: PrductService){}

  ngOnInit(): void {  
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
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      })

      Swal.fire({
        title: "Shopping cart",
        text: "Nuevo producto agregado al carro",
        icon: "success"
      });

    });



  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log('se ha ejecutado el evento onAddCart ' + id)

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "El articulo se eliminara del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.items = this.items.filter(item => item.product.id !== id); 
          if(this.items.length === 0) {
            sessionStorage.removeItem('cart');
          } 
          this.calculateTotal();
          this.saveSession();
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            })
          })
          
          Swal.fire({
            title: "Eliminado!",
            text: "Articulo eliminado.",
            icon: "success"
          });
        }
      });


    });
  }

   calculateTotal() : void {
    this.total = this.items.reduce( (accumulator, item) => accumulator + item.quantity * item.product.price , 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
