import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { ProductPipe } from './product.pipe';
import { StarComponent } from './star/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductGuard } from './product/product.guard';
import { ProductModule } from './product/product.module';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, RegisterComponent, ListEmployeesComponent, ListEmployeesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'employee', component: EmployeeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'list', component: ListEmployeesComponent },
      { path: 'edit/:id', component: RegisterComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
