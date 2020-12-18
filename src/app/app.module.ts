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
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharkDirective } from './shark.directive';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    RegisterComponent,
    ListEmployeesComponent,
    ListEmployeesComponent,
    TestComponent,
    DashboardComponent,
    SharkDirective,
    ParentComponent,
    ChildComponent,
    VehicleComponent,
    AddVehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'list', component: ListEmployeesComponent },
      { path: 'edit/:id', component: RegisterComponent },
      { path: 'test', component: TestComponent },
      { path: 'parent', component: ParentComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'addvehicle', component: AddVehicleComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
