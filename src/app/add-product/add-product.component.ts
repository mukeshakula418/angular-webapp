import {Component, OnInit} from '@angular/core';
import { AddProduct } from "./add-product";
import {Observable, Subscription} from "rxjs";
import { IProduct } from "../products/product";
import { ProductService } from "../products/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  sub!: Subscription;
  errorMessage: string = 'Unable to post the product at the moment';
  postError = false;
  postErrorMessage = '';
  max = 5;
  isReadonly = false;
  percent = 0;
  productCodes!: Observable<string[]>;

  defaultIProduct: IProduct = {
    product_id:100,
    product_code:'',
    product_name:"Product Name here..",
    release_date:'2022-10-10',
    product_description:'Your notes here...',
    price:10,
    rating:0,
    image_link:'https:imageUrl.com'
  };

  iProduct : IProduct = { ...this.defaultIProduct};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService
  ) { }

  ngOnInit() {
    // this.releaseDate = new Date();
    this.productCodes = this.productService.getProductCodes();
  }

  model = new AddProduct(
      'Hammer',
      '1234',
      '',
      12,
      'Hammer tool',
      4.5,
      'https://imageurl.com');

  onHttpError(errorResponse: any){
    console.log('error:', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  submitted = false;

  onSubmit(newProduct: NgForm) {
    console.log("in Onsubmit:", newProduct);
    if(this.iProduct) {
      console.log('iProduct::', newProduct)
      this.sub = this.productService.postProduct(newProduct).subscribe(
          (result) => {
            console.log('success', result);
            this.router.navigate(['/products']);
          },
          error => console.log('error', error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the errors for saving the product';
    }
    this.submitted = true;
  }

  newHero() {
    this.model = new AddProduct(
        'Your Product name here',
        'Code here',
        'Todays Date',
        0,
        'Hammer tool',
        0,
        'https://ImageUrl.com');
  }

}

