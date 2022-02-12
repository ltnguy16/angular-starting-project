import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public productService: ProductService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' : 
        '';
  }

  submit() {
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    var newitem = { 
      ProductId: this.data.ProductId,
      ProductName: this.data.ProductName,
      DepartmentName: this.data.DepartmentName,
      Type: "Product",
      Price: +this.data.Price,
      Quantity: +this.data.Quantity,
    } as Product;
    
    this.productService.addProduct(newitem).subscribe(_ => this.dialogRef.close());
    //Update 
  }
}