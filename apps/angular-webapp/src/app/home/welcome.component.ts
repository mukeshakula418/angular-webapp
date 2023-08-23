import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../products/product.service';
import { Promo } from '../products/promo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'welcome-navbar',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  public pageTitle = 'Home';
  sub!: Subscription;
  email: string = '';
  postError = false;
  postErrorMessage: '' | undefined;
  constructor(private productService: ProductService) {}

  defaultForm: Promo = {
    first_name: '',
    last_name: '',
    contact: 0,
    email: '',
  };

  promo: Promo = { ...this.defaultForm };

  onSubmit(promoInput: any) {
    console.log('promo data is ::', promoInput);
    console.log('promo data is ::', typeof promoInput);

    if (typeof promoInput !== 'object') {
      console.log('entering if condition');
      promoInput = {
        contact: 0,
        first_name: '',
        last_name: '',
        email: promoInput,
      };
      console.log('promo::', promoInput);
    }
    const finalInputData = promoInput;
    console.log('finalInputData:::', finalInputData);
    this.sub = this.productService.postPromoData(finalInputData).subscribe(
      (promoData) => {
        console.log('Inside onSubmit Promo Data:', promoData);
      },
      (error) => {
        alert('User already exists!');
      }
    );
  }
}
