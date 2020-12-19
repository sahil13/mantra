import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  product_id= this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
  }

}
