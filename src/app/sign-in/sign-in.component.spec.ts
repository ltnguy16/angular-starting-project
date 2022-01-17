import { waitForAsync, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { FormBuilder,  Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { SignInComponent } from './sign-in.component';
//import { cpuUsage } from 'process';
import { Router } from '@angular/router';


describe('SignInComponent', () => {  
  let component: SignInComponent;
  let router: Router;
  it('Should not navigate on Login with incorrect password and username', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.signInForm
    component.onSubmit();
    
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  /*
  let component: SignInComponent;
  let testFB: FormBuilder;

  it('test authentication is true', () => {
    let testLogin = testFB.group({
      username: ["test@test.com", Validators.email],
      password: ["test", Validators.required],
    });

    setTimeout(() =>{
      component.signInForm = testLogin;

    }, 100);

    flushMicrotasks();

    expect(component.authenticate()).toBe(true);    
  });


  it('test authentication is false with both incorrect password and username', () => {
    let testLogin = testFB.group({
      username: ["test@google.com", Validators.email],
      password: ["1233413", Validators.required],
    });

    setTimeout(() =>{
      component.signInForm = testLogin;

    }, 100);

    flushMicrotasks();

    expect(component.authenticate()).toBe(true);    
  });

  it('test authentication is false with only incorrect username', () => {
    let testLogin = testFB.group({
      username: ["test@yahoo.com", Validators.email],
      password: ["test", Validators.required],
    });

    setTimeout(() =>{
      component.signInForm = testLogin;

    }, 100);

    flushMicrotasks();

    expect(component.authenticate()).toBe(true);    
  });

  it('test authentication is false with only incorrect password', () => {
    let testLogin = testFB.group({
      username: ["test@test.com", Validators.email],
      password: ["thisisNot", Validators.required],
    });

    setTimeout(() =>{
      component.signInForm = testLogin;

    }, 100);

    flushMicrotasks();

    expect(component.authenticate()).toBe(true);    
  });
  */
});
