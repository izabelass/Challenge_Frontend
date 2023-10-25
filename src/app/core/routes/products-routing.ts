import { Route } from '@angular/router';
import { ProductsComponent } from 'src/app/features/products/products.component';

export default [
  {
    path: '',
    component: ProductsComponent,
    title: 'Products | Bradesco Challenge',
  },
] as Route[];
