import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = 'Error while retrieving the product';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        console.log('component product:::', JSON.stringify(product));
        console.log('component this.product:::', JSON.stringify(this.product));
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  onExport(productName: any) {
    this.sub = this.productService
      .getProductDetailsExport(productName)
      .subscribe((productData) => {
        console.log(
          'Component 1: productData inside component detail:::',
          productData
        );
        const jsonFileName = `${productData.product_name}${'_'}${
          productData.product_code
        }${'_'}${productData.product_id}${'.json'}`;
        console.log(
          'Component 2: jsonFileName inside component detail:::',
          jsonFileName
        );
        this.dynamicDownloadByFetch({
          fileName: jsonFileName,
          text: JSON.stringify(productData),
        });
        return productData;
      });
  }

  private async dynamicDownloadByFetch(arg: {
    fileName: string;
    text: string;
  }) {
    const element = document.createElement('a');
    const fileType = 'application/json';
    const file = new Blob([arg.text], { type: fileType });

    element.href = URL.createObjectURL(file);
    element.download = arg.fileName;
    element.click();
  }

  onSave(id: any, product: any) {
    console.log('Inside onEdit Component 1:::', id);
    console.log('Inside onEdit Component 1:::Typeof', typeof id);
    console.log('Inside onEdit Component 1:::iProduct', product);
    this.sub = this.productService
      .editProductById(id, product)
      .subscribe((productData) => {
        console.log('Inside edit Product Component 2:::', productData);
        this.router.navigate(['/products']);
      });
  }

  onDelete(id: any) {
    console.log('Inside OnDelete Component 1:::', id);
    console.log('Inside OnDelete Component 1:::Typeof', typeof id);
    this.sub = this.productService
      .deleteProductById(id)
      .subscribe((productData) => {
        console.log('Inside OnDelete Component 2:::', productData);
        this.router.navigate(['/products']);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEdit(product: any): void {
    product.isEdit = true;
  }

  onCancel(product: any): void {
    product.isEdit = false;
  }
}
