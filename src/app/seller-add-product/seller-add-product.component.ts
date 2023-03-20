import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iProduct } from '../interface';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  addProductFormGroup!:FormGroup;


  ngOnInit(){
    this.addProductFormGroup = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      productColor: new FormControl('', Validators.required),
      productCategory: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      productImgUrl: new FormControl('', Validators.required),

    })
  }

  sellerSingUpForm(product:iProduct){

  }
}
