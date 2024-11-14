import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);

  profileRoute: string | undefined;

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    const role = this.authService.getUserRole();
    this.profileRoute = role === 'CREATOR' ? '/creator/profile/list' : '/reader/profile';
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
