import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  dialogData: any;
  test = false;

  constructor(private httpClient: HttpClient) { }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getProducts(): Observable<Product[]> {
    if(!this.test){
      return this.httpClient.get<Product[]>('https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items')
    }else {
      const products = of(PRODUCTS);
      return products;
    }
  }

  addProduct (product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items/add',
      product,
    )
  }

  updateProduct (product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items/update',
      product,
    )
  }

  deleteProduct (product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items/delete',
      product,
    )
  }
  
  sendTopic(message: String): Observable<String>{
    return this.httpClient.put<String>(
      'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/topic/add',
      message,
    )
  }
  
}
