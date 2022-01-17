import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


  signInForm = this.fb.group({
    username: [null, Validators.email],
    password: [null, Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  async onSubmit(): Promise<void> {
    if(this.authenticate()) 
      this.router.navigate(["/stock"]);
    else { alert("Invalid credentials"); }
  }

  authenticate(): boolean {
    if(this.signInForm.valid) {
      const username = this.signInForm.get('username')?.value;
      const password = this.signInForm.get('password')?.value;
      if(username == "test@test.com" && password == "test")
        return true;
    }
    return false;
  }
}
