import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../models/user-profile.model';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  profileForm: FormGroup;
  profile!: UserProfile;
  profileRoute: string | undefined;

  private fb = inject(FormBuilder);
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      biography: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.profileForm.patchValue(profile);
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil de usuario');
        },
      });
    } else {
      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = { ...this.profile, ...this.profileForm.value };
      this.userProfileService
        .updateUserProfile(this.profile.id, updatedData)
        .subscribe({
          next: () => {
            this.showSnackBar('Perfil actualizado exitosamente');
            const role = this.authService.getUserRole();
            const route = role === 'CREATOR' ? '/creator/profile/list' : '/reader/profile';

            this.router.navigate([route]);
          },
          error: (error) => {
            this.showSnackBar(
              error.error?.message || 'Error al actualizar el perfil');
          },
        });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
