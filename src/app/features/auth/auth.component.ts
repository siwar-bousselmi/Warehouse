// src/app/auth/auth.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false; // Contrôle de la visibilité du mot de passe


  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router, // Inject Router

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit(): void {
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Bascule la visibilité du mot de passe
  }
  selectedButton: string | null = null;

  selectButton(button: string) {
    this.selectedButton = button;
  }
  login(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.firestoreService.saveUser(formData)
        .then(() => {
          this.router.navigate(['/warehouses']);        })
        .catch((error: any) => {
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}