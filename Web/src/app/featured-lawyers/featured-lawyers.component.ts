// featured-lawyers.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface FeaturedLawyer {
  id: string;
  name: string;
  specialties: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  isVerified: boolean;
  languages: string[];
  education: string;
  successRate: number;
  hourlyRate: string;
  description: string;
  achievements: string[];
}

@Component({
  selector: 'app-featured-lawyers',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  template: `
    <section class="featured-lawyers-section">
      <div class="container">
        <div class="section-header">
          <h2>Abogados Destacados</h2>
          <p>
            Conoce a nuestros profesionales mejor valorados y con mayor
            experiencia
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="carousel-container">
          <button
            class="carousel-btn prev-btn"
            (click)="previousSlide()"
            [disabled]="currentSlide === 0"
            mat-icon-button
          >
            <mat-icon>chevron_left</mat-icon>
          </button>

          <div class="carousel-wrapper" #carouselWrapper>
            <div
              class="carousel-track"
              [style.transform]="
                'translateX(' + -currentSlide * slideWidth + 'px)'
              "
            >
              <div
                *ngFor="let lawyer of featuredLawyers; let i = index"
                class="lawyer-slide"
              >
                <mat-card class="lawyer-card">
                  <!-- Header with Image and Basic Info -->
                  <div class="card-header">
                    <div class="lawyer-image">
                      <img
                        [src]="lawyer.imageUrl"
                        [alt]="lawyer.name"
                        loading="lazy"
                      />
                      <div class="verified-badge" *ngIf="lawyer.isVerified">
                        <mat-icon>verified</mat-icon>
                      </div>
                    </div>

                    <div class="lawyer-basic-info">
                      <h3 class="lawyer-name">{{ lawyer.name }}</h3>
                      <p class="lawyer-education">{{ lawyer.education }}</p>

                      <!-- Rating -->
                      <div class="rating-section">
                        <div class="stars">
                          <mat-icon
                            *ngFor="let star of getStarArray(lawyer.rating)"
                            class="star filled"
                            >star</mat-icon
                          >
                          <mat-icon
                            *ngFor="
                              let star of getEmptyStarArray(lawyer.rating)
                            "
                            class="star empty"
                            >star_border</mat-icon
                          >
                        </div>
                        <span class="rating-text"
                          >{{ lawyer.rating }} ({{
                            lawyer.reviewCount
                          }}
                          reseñas)</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Specialties -->
                  <div class="specialties-section">
                    <mat-chip-set>
                      <mat-chip
                        *ngFor="let specialty of lawyer.specialties.slice(0, 3)"
                      >
                        {{ specialty }}
                      </mat-chip>
                    </mat-chip-set>
                  </div>

                  <!-- Key Stats -->
                  <div class="stats-section">
                    <div class="stat-item">
                      <mat-icon>work_history</mat-icon>
                      <div class="stat-content">
                        <span class="stat-value"
                          >{{ lawyer.yearsExperience }} años</span
                        >
                        <span class="stat-label">Experiencia</span>
                      </div>
                    </div>

                    <div class="stat-item">
                      <mat-icon>trending_up</mat-icon>
                      <div class="stat-content">
                        <span class="stat-value"
                          >{{ lawyer.successRate }}%</span
                        >
                        <span class="stat-label">Éxito</span>
                      </div>
                    </div>

                    <div class="stat-item">
                      <mat-icon>location_on</mat-icon>
                      <div class="stat-content">
                        <span class="stat-value">{{ lawyer.location }}</span>
                        <span class="stat-label">Ubicación</span>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <mat-card-content class="card-content">
                    <p class="lawyer-description">{{ lawyer.description }}</p>

                    <!-- Languages and Rate -->
                    <div class="additional-info">
                      <div class="languages">
                        <mat-icon>language</mat-icon>
                        <span>{{ lawyer.languages.join(', ') }}</span>
                      </div>
                      <div class="hourly-rate">
                        <mat-icon>attach_money</mat-icon>
                        <span>{{ lawyer.hourlyRate }}</span>
                      </div>
                    </div>

                    <!-- Achievements -->
                    <div
                      class="achievements"
                      *ngIf="lawyer.achievements.length > 0"
                    >
                      <h4>Logros destacados:</h4>
                      <ul>
                        <li
                          *ngFor="
                            let achievement of lawyer.achievements.slice(0, 2)
                          "
                        >
                          <mat-icon class="achievement-icon"
                            >emoji_events</mat-icon
                          >
                          <span>{{ achievement }}</span>
                        </li>
                      </ul>
                    </div>
                  </mat-card-content>

                  <!-- Actions -->
                  <mat-card-actions class="card-actions">
                    <button
                      class="btn-secondary"
                      [routerLink]="['/abogados', lawyer.id]"
                    >
                      <mat-icon>person</mat-icon>
                      Ver Perfil
                    </button>
                    <button
                      class="btn-primary"
                      [routerLink]="['/consulta']"
                      [queryParams]="{ abogado: lawyer.id }"
                    >
                      <mat-icon>chat</mat-icon>
                      Contactar
                    </button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </div>

          <button
            class="carousel-btn next-btn"
            (click)="nextSlide()"
            [disabled]="currentSlide >= maxSlides"
            mat-icon-button
          >
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button
            *ngFor="let dot of getIndicatorArray(); let i = index"
            class="indicator-dot"
            [class.active]="i === currentSlide"
            (click)="goToSlide(i)"
          ></button>
        </div>

        <!-- View All Button -->
        <div class="section-footer">
          <button class="btn-accent view-all-btn" routerLink="/abogados">
            <mat-icon>people</mat-icon>
            Ver Todos los Abogados
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .featured-lawyers-section {
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
        }
      }

      .carousel-container {
        position: relative;
        margin-bottom: var(--spacing-xl);
      }

      .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: white;
        box-shadow: var(--shadow-md);
        width: 50px;
        height: 50px;

        &.prev-btn {
          left: -25px;
        }

        &.next-btn {
          right: -25px;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        mat-icon {
          font-size: 1.5rem;
          width: 1.5rem;
          height: 1.5rem;
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          display: none;
        }
      }

      .carousel-wrapper {
        overflow: hidden;
        padding: 0 var(--spacing-md);
      }

      .carousel-track {
        display: flex;
        transition: transform 0.3s ease;
        gap: var(--spacing-lg);
      }

      .lawyer-slide {
        flex: 0 0 350px;

        @media (max-width: 768px) {
          flex: 0 0 300px;
        }
      }

      .lawyer-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        overflow: hidden;

        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }
      }

      .card-header {
        padding: var(--spacing-lg);
        background: linear-gradient(135deg, var(--primary-lighter), white);

        .lawyer-image {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto var(--spacing-md);

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid white;
            box-shadow: var(--shadow-sm);
          }

          .verified-badge {
            position: absolute;
            bottom: -5px;
            right: -5px;
            background: var(--success-color);
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;

            mat-icon {
              color: white;
              font-size: 1rem;
              width: 1rem;
              height: 1rem;
            }
          }
        }

        .lawyer-basic-info {
          text-align: center;

          .lawyer-name {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
          }

          .lawyer-education {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-sm);
          }

          .rating-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-sm);

            .stars {
              display: flex;
              gap: 2px;

              .star {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;

                &.filled {
                  color: var(--accent-color);
                }

                &.empty {
                  color: var(--border-color);
                }
              }
            }

            .rating-text {
              font-size: 0.85rem;
              color: var(--text-secondary);
            }
          }
        }
      }

      .specialties-section {
        padding: 0 var(--spacing-lg) var(--spacing-md);

        mat-chip-set {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--spacing-xs);

          mat-chip {
            font-size: 0.8rem;
            background-color: var(--primary-lighter);
            color: var(--primary-color);
          }
        }
      }

      .stats-section {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-sm);
        padding: 0 var(--spacing-lg) var(--spacing-md);

        .stat-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--background-secondary);
          border-radius: var(--border-radius-sm);

          mat-icon {
            color: var(--primary-color);
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
          }

          .stat-content {
            display: flex;
            flex-direction: column;

            .stat-value {
              font-weight: 700;
              font-size: 0.9rem;
              color: var(--text-primary);
              line-height: 1;
            }

            .stat-label {
              font-size: 0.7rem;
              color: var(--text-secondary);
              line-height: 1;
            }
          }
        }
      }

      .card-content {
        flex: 1;
        padding: var(--spacing-lg);

        .lawyer-description {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: var(--spacing-md);
          font-size: 0.95rem;
        }

        .additional-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);

          .languages,
          .hourly-rate {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            font-size: 0.85rem;
            color: var(--text-secondary);

            mat-icon {
              font-size: 1rem;
              width: 1rem;
              height: 1rem;
              color: var(--primary-color);
            }
          }
        }

        .achievements {
          h4 {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              margin-bottom: var(--spacing-xs);
              font-size: 0.85rem;
              color: var(--text-secondary);

              .achievement-icon {
                color: var(--accent-color);
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          font-weight: 600;
          font-size: 0.9rem;
        }
      }

      .carousel-indicators {
        display: flex;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xl);

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;

          &.active {
            background: var(--primary-color);
          }

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      .section-footer {
        text-align: center;

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 600;
          font-size: 1.1rem;
          padding: var(--spacing-md) var(--spacing-xl);
        }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .carousel-track {
          gap: var(--spacing-md);
        }

        .stats-section {
          grid-template-columns: 1fr;
        }

        .additional-info {
          flex-direction: column;
          gap: var(--spacing-sm);
        }
      }
    `,
  ],
})
export class FeaturedLawyersComponent implements AfterViewInit {
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;

  currentSlide = 0;
  slideWidth = 370; // 350px + 20px gap
  maxSlides = 0;

  featuredLawyers: FeaturedLawyer[] = [
    {
      id: '1',
      name: 'María González Pérez',
      specialties: ['Derecho Civil', 'Derecho Inmobiliario', 'Contratos'],
      yearsExperience: 15,
      rating: 4.9,
      reviewCount: 127,
      location: 'Santiago',
      imageUrl: 'https://picsum.photos/150/150?random=1',
      isVerified: true,
      languages: ['Español', 'Inglés'],
      education: 'Universidad de Chile',
      successRate: 95,
      hourlyRate: 'Desde $80.000/hora',
      description:
        'Especialista en derecho civil con amplia experiencia en contratos inmobiliarios y resolución de conflictos.',
      achievements: ['Mejor Abogada Civil 2023', '500+ casos exitosos'],
    },
    {
      id: '2',
      name: 'Carlos Rodríguez Silva',
      specialties: ['Derecho Penal', 'Derecho Criminal', 'Defensa'],
      yearsExperience: 12,
      rating: 4.8,
      reviewCount: 89,
      location: 'Valparaíso',
      imageUrl: 'https://picsum.photos/150/150?random=2',
      isVerified: true,
      languages: ['Español', 'Francés'],
      education: 'Universidad Católica',
      successRate: 92,
      hourlyRate: 'Desde $100.000/hora',
      description:
        'Experto en defensa penal con reconocimiento nacional en casos complejos de derecho criminal.',
      achievements: [
        'Reconocimiento Colegio de Abogados',
        'Especialización en Francia',
      ],
    },
    {
      id: '3',
      name: 'Ana Martínez López',
      specialties: ['Derecho Familiar', 'Derecho de Menores', 'Adopciones'],
      yearsExperience: 18,
      rating: 5.0,
      reviewCount: 156,
      location: 'Concepción',
      imageUrl: 'https://picsum.photos/150/150?random=3',
      isVerified: true,
      languages: ['Español', 'Portugués'],
      education: 'Universidad de Concepción',
      successRate: 98,
      hourlyRate: 'Desde $75.000/hora',
      description:
        'Líder en derecho familiar con enfoque humano y resultados excepcionales en casos de custodia.',
      achievements: [
        'Premio Excelencia Familiar 2024',
        'Más de 300 familias reunidas',
      ],
    },
    {
      id: '4',
      name: 'Roberto Fernández Muñoz',
      specialties: ['Derecho Laboral', 'Derecho Sindical', 'Despidos'],
      yearsExperience: 20,
      rating: 4.7,
      reviewCount: 203,
      location: 'Santiago',
      imageUrl: 'https://picsum.photos/150/150?random=4',
      isVerified: true,
      languages: ['Español', 'Inglés', 'Alemán'],
      education: 'Universidad de Chile',
      successRate: 90,
      hourlyRate: 'Desde $90.000/hora',
      description:
        'Veterano en derecho laboral con amplia experiencia en negociación colectiva y despidos injustificados.',
      achievements: ['20 años de experiencia', 'Negociador certificado'],
    },
    {
      id: '5',
      name: 'Patricia Sánchez Torres',
      specialties: ['Derecho Corporativo', 'Derecho Comercial', 'M&A'],
      yearsExperience: 14,
      rating: 4.9,
      reviewCount: 98,
      location: 'Santiago',
      imageUrl: 'https://picsum.photos/150/150?random=5',
      isVerified: true,
      languages: ['Español', 'Inglés', 'Mandarín'],
      education: 'Universidad Católica',
      successRate: 96,
      hourlyRate: 'Desde $120.000/hora',
      description:
        'Experta en fusiones y adquisiciones con experiencia internacional en grandes corporaciones.',
      achievements: [
        'MBA Harvard Business School',
        'Deals por $500M+ cerrados',
      ],
    },
  ];

  ngAfterViewInit() {
    this.calculateMaxSlides();
  }

  calculateMaxSlides() {
    if (this.carouselWrapper) {
      const containerWidth = this.carouselWrapper.nativeElement.clientWidth;
      const visibleSlides = Math.floor(containerWidth / this.slideWidth);
      this.maxSlides = Math.max(0, this.featuredLawyers.length - visibleSlides);
    }
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = Math.min(index, this.maxSlides);
  }

  getIndicatorArray() {
    return Array(this.maxSlides + 1).fill(0);
  }

  getStarArray(rating: number): any[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): any[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
