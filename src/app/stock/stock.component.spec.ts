import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../product.service';
import { OverlayModule } from '@angular/cdk/overlay';

import { StockComponent } from './stock.component';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/angular-material.module'



describe("StockComponent", () => {
  let fixture: ComponentFixture<StockComponent>;
  let component: StockComponent;
  let dialog: MatDialog;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockComponent,
      ],
      providers: [
        { provide: MatDialog, useValue: { open: () => of({id: 1}) } },
        ProductService, 
      ],
      imports: [
        NoopAnimationsModule,
        AngularMaterialModule,
      ]
    }).compileComponents();
    console.log("create fixture");
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('ngOnInit is called', fakeAsync(() => {
    const ngOnInitSpy = spyOn(component, 'ngOnInit')
    component.ngOnInit();
    flush();    
    expect(ngOnInitSpy).toHaveBeenCalled();
  }));


  it('ngAfterViewInit is called', fakeAsync(() => {
    const ngAfterInitSpy = spyOn(component, 'ngAfterViewInit')
    component.ngAfterViewInit();
    flush();    
    expect(ngAfterInitSpy).toHaveBeenCalled();
  }));
  
  it('addNew open dialog', fakeAsync(() => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of({id: 1})} as MatDialogRef<StockComponent>);
    component.addNew();
    expect(dialog.open).toHaveBeenCalled();
    }));

  it('edit open dialog', fakeAsync(() => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of({id: 1})} as MatDialogRef<StockComponent>);
    // { name: 'Apple', type: 'Produce', price: 1.22 , quantity: 24},
    component.startEdit('Apple', 'Produce', 1.22, 24);
    expect(dialog.open).toHaveBeenCalled();
    }));
  
  it('edit open dialog and check less item in list', fakeAsync(() => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of({id: 1})} as MatDialogRef<StockComponent>);
    // { name: 'Apple', type: 'Produce', price: 1.22 , quantity: 24},
    component.deleteItem('Apple', 'Produce', 1.22, 24);
    expect(dialog.open).toHaveBeenCalled();
    }));
});