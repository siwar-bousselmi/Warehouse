// src/app/auth/auth.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar // Injecter MatSnackBar

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
          console.log('Utilisateur enregistré avec succès');
          this.router.navigate(['/warehouses']);
          this.snackBar.open('Connexion réussie !', 'Fermer', { duration: 3000 });
        })
        .catch((error: any) => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
          this.snackBar.open('Une erreur est survenue. Veuillez réessayer.', 'Fermer', { duration: 3000 });
        });
    } else {
      console.log('Le formulaire est invalide');
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Fermer', { duration: 3000 });
    }
  }
}