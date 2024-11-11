import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {ShowPlansComponent} from '../show-plans/show-plans.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ShowPlansComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  isOwnProfile: boolean = false;
  isCreatorProfile: boolean = false;

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    this.route.paramMap.subscribe((params) => {
      const profileId = Number(params.get('id'));

      if (profileId) {
        this.userProfileService.getUserProfile(profileId).subscribe({
          next: (profile) => {
            this.profile = profile;
            this.isOwnProfile = profile.id === userId;
            this.isCreatorProfile = profile.role === 'CREATOR';
            this.showSnackBar('Perfil cargado con éxito');

            if (this.isCreatorProfile) {
              const selectedUser = {
                userName: profile.name,
                userId: profile.id,
              };
              localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
            }
          },
          error: (error) => {
            this.showSnackBar('Error al cargar el perfil');
          },
        });
      } else if (userId) {
        this.userProfileService.getUserProfile(userId).subscribe({
          next: (profile) => {
            this.profile = profile;
            this.isOwnProfile = true;
            this.showSnackBar('Perfil cargado con éxito');
          },
          error: (error) => {
            this.showSnackBar('Error al cargar el perfil');
          },
        });
      } else {
        this.showSnackBar('Usuario no autenticado');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  navigateToUpdateProfile(): void {
    this.router.navigate(['/reader/profile/update']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  clearSelectedUser(): void {
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('selectedPlan');
    localStorage.removeItem('subscriptionData');
  }
}
