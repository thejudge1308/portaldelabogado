// testimonials.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Testimonial {
  id: string;
  clientName: string;
  clientImage: string;
  location: string;
  rating: number;
  comment: string;
  caseType: string;
  lawyerName: string;
  date: string;
  verified: boolean;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <h2>Lo que dicen nuestros clientes</h2>
          <p>
            Testimonios reales de personas que han confiado en nosotros para
            resolver sus casos legales
          </p>
        </div>

        <div class="testimonials-carousel">
          <!-- Navigation Buttons -->
          <button
            class="carousel-btn prev-btn"
            (click)="previousTestimonial()"
            mat-icon-button
            [disabled]="currentIndex === 0"
          >
            <mat-icon>chevron_left</mat-icon>
          </button>

          <button
            class="carousel-btn next-btn"
            (click)="nextTestimonial()"
            mat-icon-button
            [disabled]="
              currentIndex >= testimonials.length - visibleTestimonials
            "
          >
            <mat-icon>chevron_right</mat-icon>
          </button>

          <!-- Testimonials Container -->
          <div class="testimonials-container">
            <div
              class="testimonials-track"
              [style.transform]="
                'translateX(' +
                -currentIndex * (100 / visibleTestimonials) +
                '%)'
              "
            >
              <div
                *ngFor="let testimonial of testimonials; let i = index"
                class="testimonial-slide"
                [style.width.%]="100 / visibleTestimonials"
              >
                <mat-card class="testimonial-card">
                  <!-- Quote Icon -->
                  <div class="quote-icon">
                    <mat-icon>format_quote</mat-icon>
                  </div>

                  <!-- Rating Stars -->
                  <div class="rating-section">
                    <div class="stars">
                      <mat-icon
                        *ngFor="let star of getStarArray(testimonial.rating)"
                        class="star filled"
                        >star</mat-icon
                      >
                      <mat-icon
                        *ngFor="
                          let star of getEmptyStarArray(testimonial.rating)
                        "
                        class="star empty"
                        >star_border</mat-icon
                      >
                    </div>
                  </div>

                  <!-- Testimonial Content -->
                  <mat-card-content class="testimonial-content">
                    <p class="testimonial-text">"{{ testimonial.comment }}"</p>

                    <div class="case-info">
                      <mat-icon class="case-icon">gavel</mat-icon>
                      <span class="case-type">{{ testimonial.caseType }}</span>
                    </div>

                    <div class="lawyer-info">
                      <span class="lawyer-label">Atendido por:</span>
                      <span class="lawyer-name">{{
                        testimonial.lawyerName
                      }}</span>
                    </div>
                  </mat-card-content>

                  <!-- Client Info -->
                  <div class="client-info">
                    <div class="client-avatar">
                      <img
                        [src]="testimonial.clientImage"
                        [alt]="testimonial.clientName"
                        loading="lazy"
                      />
                      <div class="verified-badge" *ngIf="testimonial.verified">
                        <mat-icon>verified</mat-icon>
                      </div>
                    </div>

                    <div class="client-details">
                      <h4 class="client-name">{{ testimonial.clientName }}</h4>
                      <div class="client-location">
                        <mat-icon>location_on</mat-icon>
                        <span>{{ testimonial.location }}</span>
                      </div>
                      <div class="testimonial-date">{{ testimonial.date }}</div>
                    </div>
                  </div>
                </mat-card>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button
            *ngFor="let indicator of getIndicatorArray(); let i = index"
            class="indicator-dot"
            [class.active]="i === currentIndicatorIndex"
            (click)="goToTestimonial(i)"
          ></button>
        </div>

        <!-- Overall Stats -->
        <div class="testimonials-stats">
          <div class="stat-item">
            <div class="stat-number">4.8</div>
            <div class="stat-label">Calificación Promedio</div>
            <div class="stars-small">
              <mat-icon
                *ngFor="let star of [1, 2, 3, 4, 5]"
                [class]="star <= 4 ? 'star filled' : 'star empty'"
              >
                {{ star <= 4 ? 'star' : 'star_border' }}
              </mat-icon>
            </div>
          </div>

          <div class="stat-item">
            <div class="stat-number">2,847</div>
            <div class="stat-label">Reseñas Totales</div>
          </div>

          <div class="stat-item">
            <div class="stat-number">96%</div>
            <div class="stat-label">Casos Exitosos</div>
          </div>

          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Recomendarían</div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="testimonials-cta">
          <h3>¿Listo para ser nuestro próximo caso de éxito?</h3>
          <p>
            Únete a miles de clientes satisfechos que han resuelto sus casos
            legales con nosotros
          </p>
          <button class="btn-primary cta-button" routerLink="/consulta">
            <mat-icon>rocket_launch</mat-icon>
            Iniciar Mi Consulta
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .testimonials-section {
        padding: var(--spacing-2xl) 0;
        background: linear-gradient(
          135deg,
          var(--background-secondary) 0%,
          var(--background-primary) 100%
        );
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
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
      }

      .testimonials-carousel {
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

      .testimonials-container {
        overflow: hidden;
        padding: 0 var(--spacing-md);
      }

      .testimonials-track {
        display: flex;
        transition: transform 0.5s ease;
        gap: var(--spacing-lg);
      }

      .testimonial-slide {
        flex-shrink: 0;
        padding: 0 var(--spacing-sm);
      }

      .testimonial-card {
        height: 100%;
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        position: relative;
        padding: var(--spacing-xl);

        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }
      }

      .quote-icon {
        position: absolute;
        top: -15px;
        left: var(--spacing-lg);
        background: var(--primary-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        mat-icon {
          color: white;
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
          transform: rotate(180deg);
        }
      }

      .rating-section {
        margin-bottom: var(--spacing-md);
        text-align: center;

        .stars {
          display: flex;
          justify-content: center;
          gap: 2px;

          .star {
            font-size: 1.2rem;
            width: 1.2rem;
            height: 1.2rem;

            &.filled {
              color: var(--accent-color);
            }

            &.empty {
              color: var(--border-color);
            }
          }
        }
      }

      .testimonial-content {
        padding: 0;
        margin-bottom: var(--spacing-lg);

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: var(--spacing-lg);
          text-align: center;
        }

        .case-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);

          .case-icon {
            color: var(--primary-color);
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
          }

          .case-type {
            color: var(--primary-color);
            font-weight: 600;
            font-size: 0.9rem;
          }
        }

        .lawyer-info {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);

          .lawyer-label {
            margin-right: var(--spacing-xs);
          }

          .lawyer-name {
            font-weight: 600;
            color: var(--text-primary);
          }
        }
      }

      .client-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--border-color);

        .client-avatar {
          position: relative;
          flex-shrink: 0;

          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--primary-lighter);
          }

          .verified-badge {
            position: absolute;
            bottom: -2px;
            right: -2px;
            background: var(--success-color);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;

            mat-icon {
              color: white;
              font-size: 0.8rem;
              width: 0.8rem;
              height: 0.8rem;
            }
          }
        }

        .client-details {
          .client-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
          }

          .client-location {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            margin-bottom: var(--spacing-xs);

            mat-icon {
              font-size: 0.9rem;
              width: 0.9rem;
              height: 0.9rem;
              color: var(--text-secondary);
            }

            span {
              font-size: 0.9rem;
              color: var(--text-secondary);
            }
          }

          .testimonial-date {
            font-size: 0.8rem;
            color: var(--text-light);
          }
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
            transform: scale(1.2);
          }

          &:hover {
            background: var(--primary-light);
          }
        }
      }

      .testimonials-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-2xl);
        padding: var(--spacing-xl);
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);

        @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
        }

        .stat-item {
          text-align: center;

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary-color);
            line-height: 1;
            margin-bottom: var(--spacing-xs);
          }

          .stat-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-sm);
          }

          .stars-small {
            display: flex;
            justify-content: center;
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
        }
      }

      .testimonials-cta {
        text-align: center;
        padding: var(--spacing-xl);
        background: linear-gradient(
          135deg,
          var(--primary-color),
          var(--primary-light)
        );
        border-radius: var(--border-radius-lg);
        color: white;

        h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);

          @media (max-width: 768px) {
            font-size: 1.4rem;
          }
        }

        p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: var(--spacing-lg);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          background: var(--accent-color);
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: var(--spacing-md) var(--spacing-xl);
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);

          &:hover {
            background: var(--accent-dark);
            transform: translateY(-2px);
          }
        }
      }

      /* Responsive */
      @media (max-width: 1200px) {
        .testimonial-slide {
          width: 50% !important;
        }
      }

      @media (max-width: 768px) {
        .testimonial-slide {
          width: 100% !important;
        }

        .testimonials-track {
          gap: var(--spacing-md);
        }
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  visibleTestimonials = 3;
  autoPlayInterval: any;
  currentIndicatorIndex = 0;

  testimonials: Testimonial[] = [
    {
      id: '1',
      clientName: 'María José Hernández',
      clientImage: 'https://picsum.photos/150/150?random=21',
      location: 'Santiago, Chile',
      rating: 5,
      comment:
        'Excelente servicio. Mi abogado me ayudó con mi divorcio de manera muy profesional y empática. Todo el proceso fue transparente y rápido.',
      caseType: 'Derecho Familiar',
      lawyerName: 'Ana Martínez López',
      date: 'Hace 2 semanas',
      verified: true,
    },
    {
      id: '2',
      clientName: 'Roberto Silva Muñoz',
      clientImage: 'https://picsum.photos/150/150?random=22',
      location: 'Valparaíso, Chile',
      rating: 5,
      comment:
        'Necesitaba ayuda urgente con un despido injustificado. El abogado que me asignaron logró un acuerdo excelente en tiempo récord.',
      caseType: 'Derecho Laboral',
      lawyerName: 'Roberto Fernández Muñoz',
      date: 'Hace 1 mes',
      verified: true,
    },
    {
      id: '3',
      clientName: 'Carmen López Torres',
      clientImage: 'https://picsum.photos/150/150?random=23',
      location: 'Concepción, Chile',
      rating: 4,
      comment:
        'Mi caso de accidente de tránsito fue manejado de manera excepcional. Obtuve una compensación justa y el proceso fue muy claro.',
      caseType: 'Derecho Civil',
      lawyerName: 'María González Pérez',
      date: 'Hace 3 semanas',
      verified: true,
    },
    {
      id: '4',
      clientName: 'Andrés Morales Ruiz',
      clientImage: 'https://picsum.photos/150/150?random=24',
      location: 'La Serena, Chile',
      rating: 5,
      comment:
        'Constitución de mi empresa fue muy fácil con su ayuda. El abogado corporativo me guió en cada paso y resolvió todas mis dudas.',
      caseType: 'Derecho Corporativo',
      lawyerName: 'Patricia Sánchez Torres',
      date: 'Hace 1 semana',
      verified: true,
    },
    {
      id: '5',
      clientName: 'Francisca Rojas Díaz',
      clientImage: 'https://picsum.photos/150/150?random=25',
      location: 'Temuco, Chile',
      rating: 5,
      comment:
        'Compra de mi primera casa sin complicaciones. El abogado inmobiliario revisó todo perfectamente y me ahorró problemas futuros.',
      caseType: 'Derecho Inmobiliario',
      lawyerName: 'Carlos Rodríguez Silva',
      date: 'Hace 4 días',
      verified: true,
    },
    {
      id: '6',
      clientName: 'Luis Pérez Castro',
      clientImage: 'https://picsum.photos/150/150?random=26',
      location: 'Antofagasta, Chile',
      rating: 4,
      comment:
        'Problema tributario complejo resuelto satisfactoriamente. El abogado demostró gran conocimiento y me mantuvo informado siempre.',
      caseType: 'Derecho Tributario',
      lawyerName: 'Ana Martínez López',
      date: 'Hace 2 meses',
      verified: true,
    },
  ];

  ngOnInit() {
    this.updateVisibleTestimonials();
    this.startAutoPlay();

    window.addEventListener('resize', () => {
      this.updateVisibleTestimonials();
    });
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  updateVisibleTestimonials() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        this.visibleTestimonials = 1;
      } else if (window.innerWidth <= 1200) {
        this.visibleTestimonials = 2;
      } else {
        this.visibleTestimonials = 3;
      }
    }
  }

  nextTestimonial() {
    if (
      this.currentIndex <
      this.testimonials.length - this.visibleTestimonials
    ) {
      this.currentIndex++;
      this.updateIndicatorIndex();
    }
  }

  previousTestimonial() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateIndicatorIndex();
    }
  }

  goToTestimonial(index: number) {
    this.currentIndex = Math.min(
      index,
      this.testimonials.length - this.visibleTestimonials
    );
    this.updateIndicatorIndex();
  }

  updateIndicatorIndex() {
    this.currentIndicatorIndex = Math.floor(
      this.currentIndex / this.visibleTestimonials
    );
  }

  getIndicatorArray() {
    const totalIndicators = Math.ceil(
      this.testimonials.length / this.visibleTestimonials
    );
    return Array(totalIndicators).fill(0);
  }

  getStarArray(rating: number): any[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): any[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (
        this.currentIndex >=
        this.testimonials.length - this.visibleTestimonials
      ) {
        this.currentIndex = 0;
      } else {
        this.nextTestimonial();
      }
    }, 5000); // Cambiar cada 5 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}
