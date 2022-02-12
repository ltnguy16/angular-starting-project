import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/product';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              public productService: ProductService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit()  {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    var item = { 
      ProductId: this.data.ProductId,
      ProductName: this.data.ProductName,
      DepartmentName: this.data.DepartmentName,
      Type: "Product",
      Price: +this.data.Price,
      Quantity: +this.data.Quantity,
    } as Product;
    
    this.productService.updateProduct(item).subscribe(x => x);
  }
}