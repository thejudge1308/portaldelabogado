// hero-section.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <section class="hero-section">
      <div class="hero-background">
        <img
          src="https://picsum.photos/1200/600"
          alt="Justicia y Derecho"
          class="background-image"
        />
        <div class="overlay"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Conectamos clientes con los
            <span class="text-accent">mejores abogados</span>
          </h1>
          <p class="hero-subtitle">
            Encuentra el abogado especializado que necesitas para resolver tu
            caso legal de manera eficiente y profesional. Más de 500 abogados
            verificados a tu disposición.
          </p>

          <!-- Trust Indicators -->
          <div class="trust-indicators">
            <div class="indicator">
              <mat-icon>verified</mat-icon>
              <span>Abogados Verificados</span>
            </div>
            <div class="indicator">
              <mat-icon>security</mat-icon>
              <span>100% Confidencial</span>
            </div>
            <div class="indicator">
              <mat-icon>schedule</mat-icon>
              <span>Respuesta en 24h</span>
            </div>
          </div>
        </div>

        <!-- Search Card -->
        <mat-card class="search-card">
          <mat-card-header>
            <mat-card-title>Encuentra tu abogado ideal</mat-card-title>
            <mat-card-subtitle>Búsqueda rápida y gratuita</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="searchForm" class="search-form">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Especialidad Legal</mat-label>
                  <mat-select
                    formControlName="specialty"
                    placeholder="Selecciona una especialidad"
                  >
                    <mat-option value="civil">Derecho Civil</mat-option>
                    <mat-option value="penal">Derecho Penal</mat-option>
                    <mat-option value="laboral">Derecho Laboral</mat-option>
                    <mat-option value="familiar">Derecho Familiar</mat-option>
                    <mat-option value="corporativo"
                      >Derecho Corporativo</mat-option
                    >
                    <mat-option value="inmobiliario"
                      >Derecho Inmobiliario</mat-option
                    >
                    <mat-option value="tributario"
                      >Derecho Tributario</mat-option
                    >
                    <mat-option value="migratorio"
                      >Derecho Migratorio</mat-option
                    >
                  </mat-select>
                  <mat-icon matSuffix>gavel</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Ubicación</mat-label>
                  <mat-select
                    formControlName="location"
                    placeholder="Selecciona una región"
                  >
                    <mat-option value="santiago"
                      >Región Metropolitana</mat-option
                    >
                    <mat-option value="valparaiso"
                      >Región de Valparaíso</mat-option
                    >
                    <mat-option value="biobio">Región del Biobío</mat-option>
                    <mat-option value="araucania"
                      >Región de La Araucanía</mat-option
                    >
                    <mat-option value="los-lagos"
                      >Región de Los Lagos</mat-option
                    >
                    <mat-option value="maule">Región del Maule</mat-option>
                    <mat-option value="antofagasta"
                      >Región de Antofagasta</mat-option
                    >
                    <mat-option value="coquimbo">Región de Coquimbo</mat-option>
                  </mat-select>
                  <mat-icon matSuffix>location_on</mat-icon>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field
                  appearance="outline"
                  class="form-field full-width"
                >
                  <mat-label>Describe tu caso brevemente</mat-label>
                  <textarea
                    matInput
                    formControlName="description"
                    placeholder="Ej: Necesito ayuda con un divorcio de mutuo acuerdo..."
                    rows="3"
                  ></textarea>
                  <mat-icon matSuffix>description</mat-icon>
                </mat-form-field>
              </div>
            </form>
          </mat-card-content>

          <mat-card-actions class="search-actions">
            <button class="btn-primary search-button" (click)="onSearch()">
              <mat-icon>search</mat-icon>
              Buscar Abogados
            </button>
            <button class="btn-secondary" routerLink="/consulta-express">
              Consulta Express
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;

        .background-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.4);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.8) 0%,
            rgba(59, 130, 246, 0.6) 100%
          );
          z-index: -1;
        }
      }

      .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-2xl);
        align-items: center;
        z-index: 1;

        @media (max-width: 968px) {
          grid-template-columns: 1fr;
          gap: var(--spacing-xl);
          text-align: center;
        }
      }

      .hero-text {
        color: white;

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--spacing-lg);

          @media (max-width: 968px) {
            font-size: 2.5rem;
          }

          @media (max-width: 480px) {
            font-size: 2rem;
          }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: var(--spacing-xl);
          opacity: 0.95;

          @media (max-width: 768px) {
            font-size: 1.1rem;
          }
        }
      }

      .trust-indicators {
        display: flex;
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);

        @media (max-width: 768px) {
          flex-direction: column;
          gap: var(--spacing-md);
          align-items: center;
        }

        .indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.95rem;
          font-weight: 500;

          mat-icon {
            color: var(--accent-color);
            font-size: 1.2rem;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }

      .search-card {
        background: white;
        box-shadow: var(--shadow-xl);
        border-radius: var(--border-radius-xl);
        overflow: hidden;

        .mat-mdc-card-header {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--primary-light)
          );
          color: white;
          padding: var(--spacing-lg);

          .mat-mdc-card-title {
            color: white;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: var(--spacing-xs);
          }

          .mat-mdc-card-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
          }
        }

        .mat-mdc-card-content {
          padding: var(--spacing-xl);
        }
      }

      .search-form {
        .form-row {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);

          @media (max-width: 768px) {
            flex-direction: column;
            gap: var(--spacing-sm);
          }

          .form-field {
            flex: 1;

            &.full-width {
              width: 100%;
            }
          }
        }
      }

      .search-actions {
        padding: var(--spacing-lg) var(--spacing-xl);
        background-color: var(--background-secondary);
        display: flex;
        gap: var(--spacing-md);

        @media (max-width: 768px) {
          flex-direction: column;
        }

        .search-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          font-size: 1.1rem;
          font-weight: 600;
          padding: var(--spacing-md) var(--spacing-xl);
        }
      }

      // Animaciones
      .hero-text {
        animation: slideInLeft 1s ease-out;
      }

      .search-card {
        animation: slideInRight 1s ease-out;
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class HeroSectionComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      specialty: [''],
      location: [''],
      description: [''],
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const searchData = this.searchForm.value;
      console.log('Búsqueda:', searchData);
      // Aquí implementarías la lógica de búsqueda
      // Por ejemplo: this.router.navigate(['/busqueda'], { queryParams: searchData });
    }
  }
}
