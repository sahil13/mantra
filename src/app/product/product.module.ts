import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard } from './product.guard';
import { RouterModule } from '@angular/router';
import { ProductPipe } from '../product.pipe';
import { HttpClientModule } from '@angular/common/http';
import { StarComponent } from '../star/star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    StarComponent,
    ProductPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'product', component: ProductComponent },
      {
        path: 'product-detail/:id',
        canActivate: [ProductGuard],
        component: ProductDetailComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProductModule {}
