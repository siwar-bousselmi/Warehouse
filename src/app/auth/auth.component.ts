import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      try {
        await this.angularFireAuth.signInWithEmailAndPassword(
          this.authForm.value.email,
          this.authForm.value.password
        );
        this.router.navigate(['/warehouses']);
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }
}
