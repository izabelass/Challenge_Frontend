import { Product } from "./product.model";

export class ProductsResponse {
  public products: Product[];
  public total: number;
  public skip: number;
  public limit: number;

  constructor(products: Product[], total: number, skip: number, limit: number) {
    this.products = products;
    this.total = total;
    this.skip = skip;
    this.limit = limit;
  }
}