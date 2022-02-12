import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { Product } from '../product';

import { EditDialogComponent } from '../dialogs/edit/edit.component'; 
import { DeleteDialogComponent } from '../dialogs/delete/delete.component';
import { AddDialogComponent } from '../dialogs/add/add.component';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],

  encapsulation: ViewEncapsulation.Emulated
})


export class StockComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter', {static: true}) filter!: ElementRef;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Department', 'Price', 'Quantity', 'Actions'];
  dataSource = new MatTableDataSource<Product>();
  dataSrc: Product[] = [];
  wait: number = 1000;
  

  ngOnInit(): void {
      this.productService.getProducts().subscribe(x=> {
        this.dataSource.data = x;
        this.dataSrc = x;
       });
      
  }
 
  constructor(private productService: ProductService, public dialog: MatDialog,) {}
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.dataSrc;
  }

  applyFilter(filterStr: string) {
    this.dataSource.filter = filterStr;
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, { 
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => this.refreshTable(), this.wait);
      }
    });
  }

  startEdit(id: string, name: string, department: string, price: number, quantity: number) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {ProductId: id, ProductName: name, DepartmentName: department, Price: price, Quantity: quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => this.refreshTable(), this.wait);
      }
    });
  }

  deleteItem(id: string, name: string, department: string, price: number, quantity: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {ProductId: id, ProductName: name, DepartmentName: department, Price: price, Quantity: quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => this.refreshTable(), this.wait);
      }
    });
  }

  
  private refreshTable() {
    this.productService.getProducts().subscribe(x=> {
        this.dataSource.data = x;
        this.dataSrc = x;
       });
    this.paginator._changePageSize(this.paginator.pageSize);
    this.dataSource.data = this.dataSrc;
    console.log("page refreshed");
    //alert("page refreshed")
  }
}
