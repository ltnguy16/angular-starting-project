import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/product.service'; 
import { Product } from 'src/app/product';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    var deleteitem = { 
      ProductId: this.data.ProductId,
      ProductName: this.data.ProductName,
      DepartmentName: this.data.DepartmentName,
      Type: "Product",
      Price: +this.data.Price,
      Quantity: +this.data.Quantity,
    } as Product;
    
    this.productService.deleteProduct(deleteitem).subscribe(x =>x);
  }
}