// header.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  isMobileView = window.innerWidth < 768;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  closeMobileMenu() {
    // El menú se cierra automáticamente al hacer click
  }

  toggleMobileMenu() {
    console.log('Toggle mobile menu');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth < 768;
    if (this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }
}
