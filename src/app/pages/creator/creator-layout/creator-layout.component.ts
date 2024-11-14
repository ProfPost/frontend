import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creator-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './creator-layout.component.html',
  styleUrl: './creator-layout.component.css'
})
export class CreatorLayoutComponent {
  isSidebarActive = false;
  private router = inject(Router);

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  createNewPublication(): void {
    this.router.navigate(['/creator/publications/new']);
  }

}
