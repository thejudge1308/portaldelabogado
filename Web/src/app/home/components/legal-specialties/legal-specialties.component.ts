// legal-specialties.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

interface LegalSpecialty {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  caseTypes: string[];
  lawyerCount: number;
}

@Component({
  selector: 'app-legal-specialties',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  template: `
    <section class="specialties-section">
      <div class="container">
        <div class="section-header">
          <h2>Especialidades Legales</h2>
          <p>
            Contamos con abogados especializados en todas las áreas del derecho
            para brindarte la mejor asesoría legal
          </p>
        </div>

        <div class="specialties-grid">
          <mat-card
            *ngFor="let specialty of specialties"
            class="specialty-card"
            (click)="navigateToSpecialty(specialty.id)"
          >
            <div class="card-header">
              <div class="specialty-image">
                <img
                  [src]="specialty.imageUrl"
                  [alt]="specialty.title"
                  loading="lazy"
                />
                <div class="image-overlay">
                  <mat-icon class="specialty-icon">{{
                    specialty.icon
                  }}</mat-icon>
                </div>
              </div>
              <div class="lawyer-count">
                <mat-icon>people</mat-icon>
                <span>{{ specialty.lawyerCount }} abogados</span>
              </div>
            </div>

            <mat-card-content class="card-content">
              <h3 class="specialty-title">{{ specialty.title }}</h3>
              <p class="specialty-description">{{ specialty.description }}</p>

              <div class="case-types">
                <h4>Casos que manejamos:</h4>
                <ul class="case-list">
                  <li *ngFor="let caseType of specialty.caseTypes">
                    <mat-icon class="check-icon">check_circle</mat-icon>
                    <span>{{ caseType }}</span>
                  </li>
                </ul>
              </div>
            </mat-card-content>

            <mat-card-actions class="card-actions">
              <!--<button
                class="btn-secondary"
                [routerLink]="['/especialidades', specialty.id]"
              >
                Ver Abogados
              </button>
              <button
                class="btn-primary"
                [routerLink]="['/consulta']"
                [queryParams]="{ especialidad: specialty.id }"
              >
                Consulta Gratis
              </button>-->
            </mat-card-actions>
          </mat-card>
        </div>

        <div class="section-footer">
          <p class="footer-text">¿No encuentras tu especialidad?</p>
          <button class="btn-accent" routerLink="/contacto">
            <mat-icon>contact_support</mat-icon>
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .specialties-section {
        padding: var(--spacing-2xl) 0;
        background-color: var(--background-primary);
      }

      .section-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);

        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);

          @media (max-width: 768px) {
            font-size: 2rem;
          }
        }

        p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
      }

      .specialties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-2xl);

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: var(--spacing-lg);
        }
      }

      .specialty-card {
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;
        overflow: hidden;

        &:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);

          .specialty-icon {
            transform: scale(1.1);
            color: var(--accent-color);
          }

          .specialty-image img {
            transform: scale(1.05);
          }
        }
      }

      .card-header {
        position: relative;

        .specialty-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              135deg,
              rgba(30, 58, 138, 0.8) 0%,
              rgba(59, 130, 246, 0.6) 100%
            );
            display: flex;
            align-items: center;
            justify-content: center;

            .specialty-icon {
              font-size: 3rem;
              width: 3rem;
              height: 3rem;
              color: white;
              transition: all 0.3s ease;
            }
          }
        }

        .lawyer-count {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          background: rgba(255, 255, 255, 0.95);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-color);

          mat-icon {
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
          }
        }
      }

      .card-content {
        padding: var(--spacing-lg);

        .specialty-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .specialty-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }

        .case-types {
          h4 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
          }

          .case-list {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              margin-bottom: var(--spacing-xs);
              font-size: 0.9rem;
              color: var(--text-secondary);

              .check-icon {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
                color: var(--success-color);
              }
            }
          }
        }
      }

      .card-actions {
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--background-secondary);
        display: flex;
        gap: var(--spacing-sm);

        button {
          flex: 1;
          font-weight: 600;
        }
      }

      .section-footer {
        text-align: center;
        padding: var(--spacing-xl) 0;
        border-top: 1px solid var(--border-color);

        .footer-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-md);
        }

        .btn-accent {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 600;
        }
      }

      // Animaciones de entrada
      .specialty-card {
        animation: fadeInUp 0.6s ease-out forwards;

        @for $i from 1 through 8 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
          }
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class LegalSpecialtiesComponent {
  specialties: LegalSpecialty[] = [
    {
      id: 'civil',
      title: 'Derecho Civil',
      description:
        'Contratos, responsabilidad civil, daños y perjuicios, propiedad y derechos reales.',
      icon: 'balance',
      imageUrl: 'https://picsum.photos/400/200?random=1',
      caseTypes: [
        'Contratos y obligaciones',
        'Responsabilidad civil',
        'Daños y perjuicios',
        'Propiedad inmobiliaria',
      ],
      lawyerCount: 8,
    },
    {
      id: 'penal',
      title: 'Derecho Penal',
      description:
        'Defensa penal, delitos económicos, violencia intrafamiliar y procedimientos penales.',
      icon: 'gavel',
      imageUrl: 'https://picsum.photos/400/200?random=2',
      caseTypes: [
        'Defensa penal',
        'Delitos económicos',
        'Violencia intrafamiliar',
        'Drogas y narcotráfico',
      ],
      lawyerCount: 5,
    },
    {
      id: 'laboral',
      title: 'Derecho Laboral',
      description:
        'Despidos injustificados, acoso laboral, negociación colectiva y accidentes del trabajo.',
      icon: 'work',
      imageUrl: 'https://picsum.photos/400/200?random=3',
      caseTypes: [
        'Despidos injustificados',
        'Acoso laboral',
        'Accidentes del trabajo',
        'Negociación colectiva',
      ],
      lawyerCount: 5,
    },
    {
      id: 'familiar',
      title: 'Derecho de Familia',
      description:
        'Divorcios, pensión alimenticia, tuición de menores y adopciones.',
      icon: 'family_restroom',
      imageUrl: 'https://picsum.photos/400/200?random=4',
      caseTypes: [
        'Divorcios y separaciones',
        'Pensión alimenticia',
        'Tuición de menores',
        'Adopciones',
      ],
      lawyerCount: 8,
    },
    {
      id: 'corporativo',
      title: 'Derecho Corporativo',
      description:
        'Constitución de empresas, fusiones, adquisiciones y compliance empresarial.',
      icon: 'business',
      imageUrl: 'https://picsum.photos/400/200?random=5',
      caseTypes: [
        'Constitución de empresas',
        'Fusiones y adquisiciones',
        'Compliance empresarial',
        'Contratos comerciales',
      ],
      lawyerCount: 2,
    },
    {
      id: 'inmobiliario',
      title: 'Derecho Inmobiliario',
      description:
        'Compraventa de propiedades, hipotecas, arrendamientos y construcción.',
      icon: 'home',
      imageUrl: 'https://picsum.photos/400/200?random=6',
      caseTypes: [
        'Compraventa de propiedades',
        'Hipotecas y créditos',
        'Arrendamientos',
        'Derecho de construcción',
      ],
      lawyerCount: 3,
    },
  ];

  navigateToSpecialty(specialtyId: string) {
    console.log('Navegando a especialidad:', specialtyId);
    // Implementar navegación
  }
}
