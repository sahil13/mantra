import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  productsArray=new FormArray([]);

  
  productForm= new FormGroup({
    product_name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    rating:new FormControl('',[Validators.required])
  });

  constructor(private productService:ProductService) { 
    this.productsArray.push(this.productForm);
  }

  appendProducts(){
    this.productsArray.push(this.productForm);
  }



/* products=[{
  name:'Apple-',
  price:10,
  rating:2
},{
  name:'Mango',
  price:20,
  rating:1
}] */

products;
errorMessage;
  ngOnInit(): void {
    this.productService.getProducts().
    subscribe(products => {this.products = products})  
  }

  filterProducts(product_name){
    this.products= this.products.filter((product)=> product.name.indexOf(product_name)!==-1)
   /*  this.productService.getProducts().subscribe((products) => {
      console.log(products);
    }); */
  }

  newProduct={
    name:'Banana-',
    price:30,
    rating:5
  }

  addProduct(){    
    console.log(this.productForm.value);
   this.products.push(this.productForm.value);
  }

  eventEmitted(value){
alert(value);
  }

}
