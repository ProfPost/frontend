import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-reader-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './reader-layout.component.html',
  styleUrl: './reader-layout.component.css',
})
export class ReaderLayoutComponent {
  isSidebarActive = false;

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
