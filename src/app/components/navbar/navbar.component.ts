import { Component, input, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items: CartItem[] = []; 
  @Input() total: number = 0; 
}
