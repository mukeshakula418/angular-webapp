export class AddProduct {
  constructor(
    public product_name: string,
    public product_code: string,
    public release_date: any,
    public price?: number,
    public product_description?: string,
    public rating?: number,
    public image_link?: string
  ) {}
}
