import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './product';
import { PRODUCTS } from './mock-products';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  dialogData: any;

  constructor() { }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getProducts(): Observable<Product[]> {
    const products = of(PRODUCTS);
    return products;
  }

  addProduct (product: Product): void {
    this.dialogData = product;
  }

  updateProduct (product: Product): void {
    this.dialogData = product;
  }

  deleteProduct (name: string): void {
    console.log(name);
  }

  
}
