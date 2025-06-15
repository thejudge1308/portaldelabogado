// stats-section.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Statistic {
  id: string;
  value: number;
  label: string;
  suffix: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  template: `
    <section class="stats-section" #statsSection>
      <div class="stats-background">
        <img
          src="https://picsum.photos/1200/400?random=10"
          alt="Estadísticas"
          class="background-image"
        />
        <div class="overlay"></div>
      </div>

      <div class="container">
        <div class="section-header">
          <h2>Nuestros Números Hablan</h2>
          <p>Confía en nuestra experiencia y resultados comprobados</p>
        </div>

        <div class="stats-grid">
          <div
            *ngFor="let stat of statistics; let i = index"
            class="stat-card"
            [style.animation-delay.ms]="i * 200"
          >
            <div class="stat-icon" [style.color]="stat.color">
              <mat-icon>{{ stat.icon }}</mat-icon>
            </div>

            <div class="stat-content">
              <div class="stat-number">
                <span
                  class="animated-number"
                  [attr.data-target]="stat.value"
                  [attr.data-suffix]="stat.suffix"
                >
                  {{ animatedValues[i] || 0 }}{{ stat.suffix }}
                </span>
              </div>

              <h3 class="stat-label">{{ stat.label }}</h3>
              <p class="stat-description">{{ stat.description }}</p>
            </div>

            <div
              class="stat-decoration"
              [style.background-color]="stat.color"
            ></div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="trust-section">
          <h3>¿Por qué elegirnos?</h3>

          <div class="trust-grid">
            <div class="trust-item">
              <mat-icon class="trust-icon">verified_user</mat-icon>
              <div class="trust-content">
                <h4>Abogados Verificados</h4>
                <p>
                  Todos nuestros profesionales están certificados y verificados
                </p>
              </div>
            </div>

            <div class="trust-item">
              <mat-icon class="trust-icon">security</mat-icon>
              <div class="trust-content">
                <h4>Confidencialidad Total</h4>
                <p>
                  Tu información está protegida con los más altos estándares
                </p>
              </div>
            </div>

            <div class="trust-item">
              <mat-icon class="trust-icon">support_agent</mat-icon>
              <div class="trust-content">
                <h4>Soporte 24/7</h4>
                <p>Atención y seguimiento personalizado en todo momento</p>
              </div>
            </div>

            <div class="trust-item">
              <mat-icon class="trust-icon">payment</mat-icon>
              <div class="trust-content">
                <h4>Sin Costos Ocultos</h4>
                <p>Tarifas transparentes y sin sorpresas en el proceso</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Awards Section -->
        <div class="awards-section">
          <h3>Reconocimientos</h3>

          <div class="awards-grid">
            <div class="award-item">
              <img
                src="https://picsum.photos/120/80?random=11"
                alt="Premio 1"
                loading="lazy"
              />
              <span>Mejor Plataforma Legal 2024</span>
            </div>
            <div class="award-item">
              <img
                src="https://picsum.photos/120/80?random=12"
                alt="Premio 2"
                loading="lazy"
              />
              <span>Innovación Digital</span>
            </div>
            <div class="award-item">
              <img
                src="https://picsum.photos/120/80?random=13"
                alt="Premio 3"
                loading="lazy"
              />
              <span>Excelencia en Servicio</span>
            </div>
            <div class="award-item">
              <img
                src="https://picsum.photos/120/80?random=14"
                alt="Premio 4"
                loading="lazy"
              />
              <span>Top Choice Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .stats-section {
        position: relative;
        padding: var(--spacing-2xl) 0;
        color: white;
        overflow: hidden;
      }

      .stats-background {
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
          filter: brightness(0.3);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.9) 0%,
            rgba(59, 130, 246, 0.8) 50%,
            rgba(30, 58, 138, 0.9) 100%
          );
          z-index: -1;
        }
      }

      .section-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);

        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);

          @media (max-width: 768px) {
            font-size: 2rem;
          }
        }

        p {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-2xl);

        @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }
      }

      .stat-card {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-xl);
        text-align: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        overflow: hidden;

        &:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

          .stat-decoration {
            transform: scale(1.5);
            opacity: 0.3;
          }
        }

        .stat-decoration {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: 0.1;
          transition: all 0.3s ease;
        }
      }

      .stat-icon {
        margin-bottom: var(--spacing-md);

        mat-icon {
          font-size: 3rem;
          width: 3rem;
          height: 3rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
      }

      .stat-content {
        position: relative;
        z-index: 2;

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: var(--spacing-sm);
          color: var(--accent-color);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

          @media (max-width: 768px) {
            font-size: 2.5rem;
          }

          .animated-number {
            display: inline-block;
          }
        }

        .stat-label {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          color: white;
        }

        .stat-description {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.4;
          margin: 0;
        }
      }

      .trust-section {
        margin-bottom: var(--spacing-2xl);

        h3 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-xl);
          color: var(--accent-color);
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-lg);

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .trust-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-lg);
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius-md);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;

            &:hover {
              background: rgba(255, 255, 255, 0.15);
              transform: translateX(10px);
            }

            .trust-icon {
              font-size: 2.5rem;
              width: 2.5rem;
              height: 2.5rem;
              color: var(--accent-color);
              flex-shrink: 0;
            }

            .trust-content {
              h4 {
                font-size: 1.1rem;
                font-weight: 700;
                margin-bottom: var(--spacing-xs);
                color: white;
              }

              p {
                font-size: 0.9rem;
                opacity: 0.9;
                margin: 0;
                line-height: 1.4;
              }
            }
          }
        }
      }

      .awards-section {
        h3 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-xl);
          color: var(--accent-color);
        }

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);

          @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }

          .award-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-lg);
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius-md);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;

            &:hover {
              background: rgba(255, 255, 255, 0.15);
              transform: translateY(-5px);
            }

            img {
              width: 80px;
              height: 60px;
              object-fit: contain;
              filter: brightness(0) invert(1);
              opacity: 0.8;
              transition: all 0.3s ease;
            }

            span {
              font-size: 0.9rem;
              font-weight: 600;
              text-align: center;
              color: white;
            }

            &:hover img {
              opacity: 1;
              transform: scale(1.1);
            }
          }
        }
      }

      /* Animations */
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

      @keyframes countUp {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animated-number {
        animation: countUp 0.5s ease-out;
      }
    `,
  ],
})
export class StatsSectionComponent implements OnInit {
  @ViewChild('statsSection') statsSection!: ElementRef;

  animatedValues: number[] = [];
  hasAnimated = false;

  statistics: Statistic[] = [
    {
      id: 'cases',
      value: 15000,
      label: 'Casos Resueltos',
      suffix: '+',
      icon: 'assignment_turned_in',
      description: 'Casos exitosamente resueltos con satisfacción del cliente',
      color: '#F59E0B',
    },
    {
      id: 'clients',
      value: 12500,
      label: 'Clientes Satisfechos',
      suffix: '+',
      icon: 'sentiment_very_satisfied',
      description: 'Clientes que recomiendan nuestros servicios',
      color: '#10B981',
    },
    {
      id: 'lawyers',
      value: 500,
      label: 'Abogados Activos',
      suffix: '+',
      icon: 'people',
      description: 'Profesionales verificados en toda Chile',
      color: '#3B82F6',
    },
    {
      id: 'experience',
      value: 8,
      label: 'Años de Experiencia',
      suffix: '',
      icon: 'schedule',
      description: 'Años conectando clientes con abogados especializados',
      color: '#8B5CF6',
    },
  ];

  ngOnInit() {
    this.animatedValues = new Array(this.statistics.length).fill(0);

    // Configurar Intersection Observer para animar cuando entre en vista
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.startAnimation();
              this.hasAnimated = true;
            }
          });
        },
        { threshold: 0.5 }
      );

      // Observar el elemento después de que esté disponible
      setTimeout(() => {
        if (this.statsSection) {
          observer.observe(this.statsSection.nativeElement);
        }
      }, 100);
    }
  }

  startAnimation() {
    this.statistics.forEach((stat, index) => {
      this.animateValue(index, stat.value);
    });
  }

  animateValue(index: number, targetValue: number) {
    const duration = 2000; // 2 segundos
    const steps = 60; // 60 pasos para suavidad
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentValue = Math.min(currentValue + increment, targetValue);

      // Usar easing para hacer la animación más natural
      const progress = step / steps;
      const easedProgress = this.easeOutQuart(progress);
      this.animatedValues[index] = Math.floor(targetValue * easedProgress);

      if (step >= steps) {
        this.animatedValues[index] = targetValue;
        clearInterval(timer);
      }
    }, stepDuration);
  }

  // Función de easing para animación más natural
  easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }
}
