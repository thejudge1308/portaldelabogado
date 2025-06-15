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
  template: `
    <mat-toolbar class="navbar" [class.scrolled]="isScrolled">
      <div class="container nav-container">
        <!-- Logo Section -->
        <div class="logo-section">
          <img
            src="images/logo.png"
            alt="Portal del Abogado Logo"
            class="logo-img"
            width="auto"
            height="60"
          />
          <!--<span class="logo-text text-primary">Portal del Abogado</span>-->
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav-menu desktop-only">
          <a
            class="nav-link"
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Inicio
          </a>
          <a class="nav-link" routerLink="/servicios" routerLinkActive="active">
            Servicios
          </a>
          <a class="nav-link" routerLink="/abogados" routerLinkActive="active">
            Abogados
          </a>
          <a class="nav-link" routerLink="/nosotros" routerLinkActive="active">
            Sobre Nosotros
          </a>
          <a class="nav-link" routerLink="/contacto" routerLinkActive="active">
            Contacto
          </a>
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
          <!-- Phone Number - Desktop Only -->
          <div class="phone-section desktop-only">
            <mat-icon class="phone-icon">phone</mat-icon>
            <span class="phone-number">+56983684222</span>
          </div>

          <!-- CTA Button -->
          <button class="btn-primary cta-button" routerLink="/consulta">
            Consulta Gratis
          </button>

          <!-- Mobile Menu Trigger -->
          <button
            mat-icon-button
            class="mobile-menu-trigger mobile-only"
            [matMenuTriggerFor]="mobileMenu"
            aria-label="Menú"
          >
            <mat-icon>menu</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Mobile Menu -->
    <mat-menu #mobileMenu="matMenu" class="mobile-menu">
      <a mat-menu-item routerLink="/" (click)="closeMobileMenu()">
        <mat-icon>home</mat-icon>
        <span>Inicio</span>
      </a>
      <a mat-menu-item routerLink="/servicios" (click)="closeMobileMenu()">
        <mat-icon>gavel</mat-icon>
        <span>Servicios</span>
      </a>
      <a mat-menu-item routerLink="/abogados" (click)="closeMobileMenu()">
        <mat-icon>people</mat-icon>
        <span>Abogados</span>
      </a>
      <a mat-menu-item routerLink="/nosotros" (click)="closeMobileMenu()">
        <mat-icon>info</mat-icon>
        <span>Sobre Nosotros</span>
      </a>
      <a mat-menu-item routerLink="/contacto" (click)="closeMobileMenu()">
        <mat-icon>contact_mail</mat-icon>
        <span>Contacto</span>
      </a>
      <mat-divider></mat-divider>
      <a mat-menu-item href="tel:+56912345678">
        <mat-icon>phone</mat-icon>
        <span>+56983684222</span>
      </a>
    </mat-menu>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: var(--background-primary);
        border-bottom: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;

        &.scrolled {
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(10px);
        }
      }

      .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 64px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);

        .logo-img {
          border-radius: var(--border-radius-sm);
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
        }
      }

      .nav-menu {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
      }

      .nav-link {
        color: var(--text-secondary);
        text-decoration: none;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-sm);
        transition: all 0.3s ease;
        font-weight: 500;

        &:hover {
          color: var(--primary-color);
          background-color: var(--primary-lighter);
        }

        &.active {
          color: var(--primary-color);
          font-weight: 600;
        }
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }

      .phone-section {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--text-secondary);

        .phone-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }

        .phone-number {
          font-weight: 600;
          font-size: 0.9rem;
        }
      }

      .cta-button {
        font-weight: 600;
        font-size: 0.9rem;
        padding: var(--spacing-sm) var(--spacing-lg);
      }

      .mobile-menu-trigger {
        color: var(--primary-color);
      }

      .desktop-only {
        @media (max-width: 768px) {
          display: none !important;
        }
      }

      .mobile-only {
        @media (min-width: 769px) {
          display: none !important;
        }
      }

      .mobile-menu {
        margin-top: var(--spacing-sm);

        .mat-mdc-menu-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-primary);

          &:hover {
            background-color: var(--primary-lighter);
            color: var(--primary-color);
          }
        }
      }
    `,
  ],
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  closeMobileMenu() {
    // El menú se cierra automáticamente al hacer click
  }
}
