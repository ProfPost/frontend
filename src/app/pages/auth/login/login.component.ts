import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../shared/models/auth-request.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (user) => {
        this.showSnackBar('Inicio de Sesión Existoso');
        if (user.role === 'READER') {
          this.router.navigate(['/reader']);
        } else if (user.role === 'CREATOR') {
          this.router.navigate(['/creator']);
        }
      },
      error: () => {
        this.showSnackBar(
          'Error en el inicio de sesión. Por favor, intenta de nuevo.'
        );
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open('Login Successful', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  getUserRole(): string {
    const role = localStorage.getItem('profpost_auth');
    return role ? role : 'READER';
  }
}
