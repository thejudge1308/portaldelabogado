// how-it-works.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
  estimatedTime: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
  ],
  template: `
    <section class="how-it-works-section">
      <div class="container">
        <div class="section-header">
          <h2>¿Cómo Funciona?</h2>
          <p>
            En solo 4 pasos simples te conectamos con el abogado ideal para tu
            caso
          </p>
        </div>

        <!-- Desktop Version - Horizontal Timeline -->
        <div class="desktop-timeline">
          <div class="timeline-container">
            <div class="timeline-line"></div>

            <div class="steps-grid">
              <div
                *ngFor="let step of processSteps; let i = index"
                class="step-card"
                [class.active]="activeStep === i"
                (mouseenter)="setActiveStep(i)"
                [style.animation-delay.ms]="i * 200"
              >
                <div class="step-number">
                  <span>{{ step.stepNumber }}</span>
                </div>

                <mat-card class="step-content">
                  <div class="step-icon">
                    <mat-icon>{{ step.icon }}</mat-icon>
                  </div>

                  <mat-card-header>
                    <mat-card-title>{{ step.title }}</mat-card-title>
                    <mat-card-subtitle>{{
                      step.estimatedTime
                    }}</mat-card-subtitle>
                  </mat-card-header>

                  <mat-card-content>
                    <p class="step-description">{{ step.description }}</p>

                    <ul class="step-details">
                      <li *ngFor="let detail of step.details">
                        <mat-icon class="check-icon">check_circle</mat-icon>
                        <span>{{ detail }}</span>
                      </li>
                    </ul>
                  </mat-card-content>
                </mat-card>

                <!-- Connector Arrow -->
                <div class="step-connector" *ngIf="i < processSteps.length - 1">
                  <mat-icon>arrow_forward</mat-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Version - Vertical Stepper -->
        <div class="mobile-stepper">
          <mat-stepper orientation="vertical" [linear]="false">
            <mat-step
              *ngFor="let step of processSteps; let i = index"
              [editable]="true"
            >
              <ng-template matStepLabel>{{ step.title }}</ng-template>

              <div class="mobile-step-content">
                <div class="step-header">
                  <div class="step-icon-mobile">
                    <mat-icon>{{ step.icon }}</mat-icon>
                  </div>
                  <div class="step-info">
                    <h3>{{ step.title }}</h3>
                    <span class="time-badge">{{ step.estimatedTime }}</span>
                  </div>
                </div>

                <p class="step-description-mobile">{{ step.description }}</p>

                <ul class="step-details-mobile">
                  <li *ngFor="let detail of step.details">
                    <mat-icon class="check-icon">check_circle</mat-icon>
                    <span>{{ detail }}</span>
                  </li>
                </ul>
              </div>
            </mat-step>
          </mat-stepper>
        </div>

        <!-- Call to Action -->
        <!--<div class="cta-section">
          <div class="cta-content">
            <h3>¿Listo para comenzar?</h3>
            <p>
              Inicia tu consulta legal ahora y obtén respuesta en menos de 24
              horas
            </p>

            <div class="cta-buttons">
              <button class="btn-primary cta-primary" routerLink="/consulta">
                <mat-icon>rocket_launch</mat-icon>
                Iniciar Consulta
              </button>
              <button class="btn-secondary" routerLink="/abogados">
                <mat-icon>people</mat-icon>
                Ver Abogados
              </button>
            </div>
          </div>

          <div class="cta-stats">
            <div class="stat-item">
              <span class="stat-number">24h</span>
              <span class="stat-label">Tiempo promedio de respuesta</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">98%</span>
              <span class="stat-label">Satisfacción del cliente</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Abogados verificados</span>
            </div>
          </div>
        </div>-->
      </div>
    </section>
  `,
  styles: [
    `
      .how-it-works-section {
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
          max-width: 600px;
          margin: 0 auto;
        }
      }

      /* Desktop Timeline */
      .desktop-timeline {
        display: block;

        @media (max-width: 968px) {
          display: none;
        }
      }

      .timeline-container {
        position: relative;
        padding: var(--spacing-xl) 0;
      }

      .timeline-line {
        position: absolute;
        top: 50%;
        left: 10%;
        right: 10%;
        height: 4px;
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--primary-light)
        );
        border-radius: 2px;
        z-index: 1;
      }

      .steps-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-lg);
        position: relative;
        z-index: 2;
      }

      .step-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s ease;
        opacity: 0;
        animation: slideInUp 0.6s ease-out forwards;

        &.active .step-content {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-color);
        }

        &:hover .step-content {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
      }

      .step-number {
        width: 60px;
        height: 60px;
        background: linear-gradient(
          135deg,
          var(--primary-color),
          var(--primary-light)
        );
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: var(--spacing-md);
        box-shadow: var(--shadow-md);
        z-index: 3;
        position: relative;
      }

      .step-content {
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        overflow: hidden;

        .step-icon {
          text-align: center;
          padding: var(--spacing-md) 0 0;

          mat-icon {
            font-size: 2.5rem;
            width: 2.5rem;
            height: 2.5rem;
            color: var(--accent-color);
          }
        }

        .mat-mdc-card-header {
          text-align: center;
          padding: var(--spacing-sm) var(--spacing-lg) 0;

          .mat-mdc-card-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
          }

          .mat-mdc-card-subtitle {
            color: var(--accent-color);
            font-weight: 600;
            font-size: 0.9rem;
          }
        }

        .mat-mdc-card-content {
          padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);

          .step-description {
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: var(--spacing-md);
            text-align: center;
          }

          .step-details {
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

      .step-connector {
        position: absolute;
        top: 30px;
        right: -40px;
        z-index: 4;

        mat-icon {
          font-size: 2rem;
          width: 2rem;
          height: 2rem;
          color: var(--primary-light);
          animation: pulse 2s infinite;
        }
      }

      /* Mobile Stepper */
      .mobile-stepper {
        display: none;

        @media (max-width: 968px) {
          display: block;
        }

        .mobile-step-content {
          padding: var(--spacing-lg);

          .step-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);

            .step-icon-mobile {
              width: 50px;
              height: 50px;
              background: linear-gradient(
                135deg,
                var(--primary-color),
                var(--primary-light)
              );
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;

              mat-icon {
                color: white;
                font-size: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;
              }
            }

            .step-info {
              h3 {
                margin: 0 0 var(--spacing-xs) 0;
                color: var(--text-primary);
                font-weight: 700;
              }

              .time-badge {
                background: var(--accent-color);
                color: white;
                padding: var(--spacing-xs) var(--spacing-sm);
                border-radius: var(--border-radius-sm);
                font-size: 0.8rem;
                font-weight: 600;
              }
            }
          }

          .step-description-mobile {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: var(--spacing-md);
          }

          .step-details-mobile {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              margin-bottom: var(--spacing-xs);
              color: var(--text-secondary);

              .check-icon {
                color: var(--success-color);
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
              }
            }
          }
        }
      }

      /* CTA Section */
      .cta-section {
        background: linear-gradient(
          135deg,
          var(--primary-color),
          var(--primary-light)
        );
        border-radius: var(--border-radius-xl);
        padding: var(--spacing-2xl);
        margin-top: var(--spacing-2xl);
        color: white;

        @media (max-width: 768px) {
          padding: var(--spacing-xl);
          text-align: center;
        }

        .cta-content {
          text-align: center;
          margin-bottom: var(--spacing-xl);

          h3 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: var(--spacing-sm);

            @media (max-width: 768px) {
              font-size: 1.5rem;
            }
          }

          p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: var(--spacing-lg);
          }

          .cta-buttons {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;

            @media (max-width: 768px) {
              flex-direction: column;
              align-items: center;
            }

            .cta-primary {
              background: var(--accent-color);
              border: none;

              &:hover {
                background: var(--accent-dark);
              }
            }

            button {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              font-weight: 600;
            }
          }
        }

        .cta-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .stat-item {
            text-align: center;

            .stat-number {
              display: block;
              font-size: 2.5rem;
              font-weight: 800;
              color: var(--accent-color);
              margin-bottom: var(--spacing-xs);
            }

            .stat-label {
              font-size: 0.9rem;
              opacity: 0.9;
            }
          }
        }
      }

      /* Animations */
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
    `,
  ],
})
export class HowItWorksComponent {
  activeStep = 0;

  processSteps: ProcessStep[] = [
    {
      stepNumber: 1,
      title: 'Describe tu Caso',
      description:
        'Completa nuestro formulario con los detalles de tu situación legal',
      icon: 'edit_note',
      details: [
        'Formulario simple y rápido',
        'Información confidencial',
        'Sin compromiso inicial',
      ],
      estimatedTime: '5 minutos',
    },
    {
      stepNumber: 2,
      title: 'Te Conectamos',
      description:
        'Nuestro sistema encuentra los abogados más adecuados para tu caso',
      icon: 'connect_without_contact',
      details: [
        'Algoritmo inteligente',
        'Abogados verificados',
        'Especialización exacta',
      ],
      estimatedTime: '2 horas',
    },
    {
      stepNumber: 3,
      title: 'Consulta Inicial',
      description: 'Recibe propuestas y programa tu primera consulta gratuita',
      icon: 'video_call',
      details: [
        'Consulta gratuita',
        'Presencial o virtual',
        'Evaluación profesional',
      ],
      estimatedTime: '24 horas',
    },
    {
      stepNumber: 4,
      title: 'Resolución',
      description:
        'Trabaja con tu abogado elegido para resolver tu caso exitosamente',
      icon: 'task_alt',
      details: [
        'Seguimiento personalizado',
        'Comunicación directa',
        'Resultados garantizados',
      ],
      estimatedTime: 'Variable',
    },
  ];

  setActiveStep(index: number) {
    this.activeStep = index;
  }
}
