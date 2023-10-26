import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ AsyncPipe, NgIf, NgFor, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit{
public readonly products$: Observable<Product[]> = this.productsService.products$;
public readonly singleProduct$: Observable<Product> = this.productsService.singleProduct$;

public searchForm!: FormGroup;

constructor(private productsService: ProductsService, private fb: FormBuilder) {}

public ngOnInit(): void {
  this.productsService.getAllProducts();

  this.searchForm = this.fb.group({
    search: [''],
  })
  }

  public onSubmit(): void {
    const searchText: string = this.searchForm.controls['search'].value;
    this.productsService.getProductsByQuery(searchText)
  }
}
