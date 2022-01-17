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
  displayedColumns = ['name', 'type', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  dataSrc: Product[] = [];
  name: string = '';


  ngOnInit(): void {
      this.productService.getProducts().subscribe(x=> {
        this.dataSrc = x;
         x.forEach( y => {
           console.log(JSON.stringify(y));
         })  
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
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.dataSrc.push(this.productService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(name: string, type: string, price: number, quantity: number) {
    this.name = name;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {name: name, type: type, price: price, quantity: quantity}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dataSource.data.findIndex(x => x.name === this.name)
        this.dataSrc[foundIndex] = this.productService.getDialogData();
         this.refreshTable();
      }
    });
  }

  deleteItem(name: string, type: string, price: number, quantity: number) {
    this.name = name;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: name, type: type, price: price, quantity: quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dataSource.data.findIndex(x => x.name === this.name)
        this.dataSrc.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.dataSource.data = this.dataSrc;
    //alert("page refreshed")
  }
}
