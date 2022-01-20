import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from 'src/app/angular-material.module'


describe('SignInComponent', () => {  
  let fixture: ComponentFixture<SignInComponent>;
  let router: Router;
  let testFB: FormBuilder;
  let component: SignInComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInComponent,
      ],
      providers: [
        FormBuilder,
      ],
      imports: [
        NoopAnimationsModule,
        AngularMaterialModule,
        RouterTestingModule.withRoutes([]),
      ]
    }).compileComponents()


  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    testFB = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('Should not navigate on Login with incorrect password or username', () => {
    const navigateSpy = spyOn(router, 'navigate');

    let testLogin = testFB.group({
      username: ["test@test.com"],
      password: ["noCorrectPassword"],
    })
    component.signInForm = testLogin;
    component.onSubmit();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Should navigate on Login with correct password or username', () => {

    const navigateSpy = spyOn(router, 'navigate');

    let testLogin = testFB.group({
      username: ["test@test.com"],
      password: ["test"],
    })
    component.signInForm = testLogin;
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalled();
  });
});
