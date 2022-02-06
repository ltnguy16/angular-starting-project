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
    //this.dialogData = product;
    //if(!this.test){
      console.log('test2');
      //var test = { ProductId: '2', ProductName: 'Cabbage', DepartmentName: 'Produce', Price: 4.49, Quantity: 12} as Product;
      return this.httpClient.put<Product>(
         'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items/add',
         product,
        
       )
       //console.log("end add")
    //}
  }


  addProduct2(): Observable<Product> {
    var body = { };
    var test = { ProductId: '2', ProductName: 'Banana', DepartmentName: 'Produce', Price: 4.49, Quantity: 12} as Product;
    /*
    let header = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    */
    console.log("check");
    return this.httpClient.put<Product>(
      'https://t6i6w79qca.execute-api.us-east-1.amazonaws.com/Prod/items/add', 
      test,
      );
  }


  
  updateProduct (product: Product): void {
    this.dialogData = product;
    console.log(this.dialogData);
  }

  deleteProduct (name: string): void {
    console.log(name);
  }

  
}
