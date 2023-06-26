export class AddProduct {
    constructor(
        public productId: number,
        public productName: string,
        public productCode: string,
        public releaseDate: any,
        public price?: number,
        public description?: string,
        public starRating?: number,
        public imageUrl?: string,
    ) {  }
}