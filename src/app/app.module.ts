import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';
import { StockComponent } from './stock/stock.component';

import { AngularMaterialModule } from './angular-material.module';

import { EditDialogComponent } from './dialogs/edit/edit.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { AddDialogComponent } from './dialogs/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    StockComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule, 
    ReactiveFormsModule,
  ],
  entryComponents: [
    EditDialogComponent,
    DeleteDialogComponent,
    AddDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
