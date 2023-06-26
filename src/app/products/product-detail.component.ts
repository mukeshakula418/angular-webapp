import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = 'Error while retrieving the product';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
