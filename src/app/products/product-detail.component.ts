import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import {ProductService} from "./product.service";
import {MouseEvent} from "ngx-bootstrap/utils/facade/browser";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = 'Error while retrieving the product';
  private readonly setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  };
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product
        console.log('component product:::', JSON.stringify(product));
        console.log('component this.product:::', JSON.stringify(this.product));
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  onExport(productName:any) {
    this.sub = this.productService.getProductDetailsExport(productName).subscribe(
        (productData) => {
          console.log('Component 1: productData inside compeont detail:::', productData);
          const jsonFileName = `${productData.product_name}${'_'}${productData.product_code}${'_'}${productData.product_id}${".json"}`;
          console.log('Component 2: jsonFileName inside compeont detail:::', jsonFileName);
          this.dynamicDownloadByHtml({
              fileName: jsonFileName,
              text: JSON.stringify(productData)
            });
            return productData;
        }
    )
  }

  private dynamicDownloadByHtml(arg: { fileName: string; text: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/json';
    element.setAttribute('href',`data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    // const event = new MouseEvent('click');
    // element.dispatchEvent(event);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
