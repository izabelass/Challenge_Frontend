import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
import { Product } from '../../models/product.model';
import { environment } from 'src/environments/environment';
import { ProductsResponse } from '../../models/products-response.model';

const sampleProduct = {
  id: 1,
	title: "iPhone 9",
	description: "An apple mobile which is nothing like apple",
	price: 549,
	discountPercentage: 12.96,
	rating: 4.69,
	stock: 94,
	brand: "Apple",
	category: "smartphones",
	thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
	images: [
				"https://i.dummyjson.com/data/products/1/1.jpg",
				"https://i.dummyjson.com/data/products/1/2.jpg",
	]
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _productsUrl = `${environment.api}/products`;
  private _productsSubject$ = new BehaviorSubject<Product[]>([]);
  private _singleProductSubject$ = new BehaviorSubject<Product>(sampleProduct);

  public readonly products$: Observable<Product[]> = this._productsSubject$.asObservable();
  public readonly singleProduct$: Observable<Product> = this._singleProductSubject$.asObservable();

  
  constructor(private http: HttpClient) {}

  public getAllProducts(): void {
    this.http.get<ProductsResponse>(this._productsUrl)
    .pipe(
      take(1),
      tap((response) => {
        const products = response.products;
        this._productsSubject$.next(products);
      })
    )
    .subscribe();
  }

  public getProductById(id: string): void {
    let url = `${this._productsUrl}/${id}`
    this.http.get<Product>(url).pipe(take(1)).subscribe(response => {
      this._singleProductSubject$.next(response);
    })
  }

  public getProductsByQuery(query: string): void {
    let url = `${this._productsUrl}/search?q=${query}`
    this.http.get<ProductsResponse>(url).pipe(take(1), tap((response) => {
      const products = response.products;
      this._productsSubject$.next(products);
    })).subscribe()
  }

}
