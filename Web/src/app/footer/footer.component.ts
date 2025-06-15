// footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface FooterLink {
  label: string;
  route: string;
  external?: boolean;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  template: `
    <footer class="footer">
      <div class="footer-main">
        <div class="container">
          <div class="footer-content">
            <!-- Company Info Section -->
            <div class="footer-section company-info">
              <div class="logo-section">
                <img
                  src="https://picsum.photos/50/50?random=40"
                  alt="Portal del Abogado Logo"
                  class="footer-logo"
                />
                <h3 class="company-name">Portal del Abogado</h3>
              </div>

              <p class="company-description">
                Conectamos clientes con los mejores abogados especializados de
                Chile. Tu solución legal está a un click de distancia.
              </p>

              <div class="company-stats">
                <div class="stat-item">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Abogados</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">15k+</span>
                  <span class="stat-label">Casos</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">98%</span>
                  <span class="stat-label">Satisfacción</span>
                </div>
              </div>

              <!-- Certifications -->
              <div class="certifications">
                <h4>Certificaciones</h4>
                <div class="cert-logos">
                  <img
                    src="https://picsum.photos/80/50?random=41"
                    alt="Certificación 1"
                    loading="lazy"
                  />
                  <img
                    src="https://picsum.photos/80/50?random=42"
                    alt="Certificación 2"
                    loading="lazy"
                  />
                  <img
                    src="https://picsum.photos/80/50?random=43"
                    alt="Certificación 3"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <!-- Quick Links Section -->
            <div class="footer-section">
              <h4 class="section-title">Enlaces Rápidos</h4>
              <ul class="footer-links">
                <li *ngFor="let link of quickLinks">
                  <a
                    [routerLink]="link.route"
                    [target]="link.external ? '_blank' : '_self'"
                    class="footer-link"
                  >
                    <mat-icon>chevron_right</mat-icon>
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Legal Services Section -->
            <div class="footer-section">
              <h4 class="section-title">Servicios Legales</h4>
              <ul class="footer-links">
                <li *ngFor="let service of legalServices">
                  <a [routerLink]="service.route" class="footer-link">
                    <mat-icon>chevron_right</mat-icon>
                    {{ service.label }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact Info Section -->
            <div class="footer-section contact-section">
              <h4 class="section-title">Contacto</h4>

              <div class="contact-info">
                <div class="contact-item">
                  <mat-icon class="contact-icon">location_on</mat-icon>
                  <div class="contact-details">
                    <span class="contact-label">Oficina Principal</span>
                    <span class="contact-value">Mi casa, Talca</span>
                  </div>
                </div>

                <div class="contact-item">
                  <mat-icon class="contact-icon">phone</mat-icon>
                  <div class="contact-details">
                    <span class="contact-label">Teléfono</span>
                    <a href="tel:+56912345678" class="contact-value"
                      >+56983684222</a
                    >
                  </div>
                </div>

                <div class="contact-item">
                  <mat-icon class="contact-icon">email</mat-icon>
                  <div class="contact-details">
                    <span class="contact-label">Email</span>
                    <a
                      href="mailto:contacto@portaldelabogado.cl"
                      class="contact-value"
                    >
                      {{ 'contacto@portaldelabogado.cl' }}
                    </a>
                  </div>
                </div>

                <div class="contact-item">
                  <mat-icon class="contact-icon">schedule</mat-icon>
                  <div class="contact-details">
                    <span class="contact-label">Horario</span>
                    <span class="contact-value">Lun - Vie: 9:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <!-- Emergency Contact -->
              <div class="emergency-contact">
                <h5>Consultas de Emergencia</h5>
                <a href="tel:+56983684222" class="emergency-number">
                  <mat-icon>local_hospital</mat-icon>
                  +56 9 83684222
                </a>
                <span class="emergency-note">Disponible 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media & Newsletter Section -->
      <div class="footer-social">
        <div class="container">
          <div class="social-content">
            <div class="social-info">
              <h4>Síguenos en Redes Sociales</h4>
              <p>Mantente al día con las últimas noticias legales</p>
            </div>

            <div class="social-links">
              <a
                *ngFor="let social of socialLinks"
                [href]="social.url"
                target="_blank"
                class="social-link"
                [style.background-color]="social.color"
                [attr.aria-label]="social.platform"
              >
                <mat-icon>{{ social.icon }}</mat-icon>
              </a>
            </div>

            <!-- Newsletter Mini -->
            <div class="newsletter-mini">
              <span>Newsletter semanal</span>
              <button
                class="btn-accent newsletter-btn"
                routerLink="/newsletter"
              >
                <mat-icon>email</mat-icon>
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="footer-bottom">
        <div class="container">
          <div class="bottom-content">
            <div class="copyright">
              <p>
                &copy; {{ currentYear }} Portal del Abogado. Todos los derechos
                reservados.
              </p>
              <p class="legal-note">
                Portal del Abogado es una plataforma que conecta clientes con
                abogados independientes.
              </p>
            </div>

            <div class="legal-links">
              <a routerLink="/privacidad" class="legal-link"
                >Política de Privacidad</a
              >
              <span class="separator">•</span>
              <a routerLink="/terminos" class="legal-link"
                >Términos y Condiciones</a
              >
              <span class="separator">•</span>
              <a routerLink="/cookies" class="legal-link"
                >Política de Cookies</a
              >
              <span class="separator">•</span>
              <a routerLink="/ayuda" class="legal-link">Ayuda</a>
            </div>

            <!-- Payment Methods -->
            <div class="payment-methods">
              <span class="payment-label">Métodos de pago seguros:</span>
              <div class="payment-icons">
                <img
                  src="https://picsum.photos/40/25?random=44"
                  alt="Visa"
                  loading="lazy"
                />
                <img
                  src="https://picsum.photos/40/25?random=45"
                  alt="Mastercard"
                  loading="lazy"
                />
                <img
                  src="https://picsum.photos/40/25?random=46"
                  alt="WebPay"
                  loading="lazy"
                />
                <img
                  src="https://picsum.photos/40/25?random=47"
                  alt="Khipu"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <button
        class="back-to-top"
        [class.visible]="showBackToTop"
        (click)="scrollToTop()"
        mat-fab
        color="primary"
        aria-label="Volver arriba"
      >
        <mat-icon>keyboard_arrow_up</mat-icon>
      </button>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--primary-color);
        color: white;
        margin-top: auto;
      }

      .footer-main {
        padding: var(--spacing-2xl) 0;
        background: linear-gradient(
          135deg,
          var(--primary-color) 0%,
          var(--primary-dark) 100%
        );

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: var(--spacing-2xl);

          @media (max-width: 1024px) {
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
          }

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
            text-align: center;
          }
        }
      }

      .footer-section {
        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-lg);
          color: var(--accent-color);
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 30px;
            height: 2px;
            background: var(--accent-color);

            @media (max-width: 768px) {
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }

      /* Company Info Section */
      .company-info {
        .logo-section {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);

          @media (max-width: 768px) {
            justify-content: center;
          }

          .footer-logo {
            width: 50px;
            height: 50px;
            border-radius: var(--border-radius-sm);
          }

          .company-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin: 0;
          }
        }

        .company-description {
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
          opacity: 0.9;
        }

        .company-stats {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);

          @media (max-width: 768px) {
            justify-content: center;
          }

          .stat-item {
            text-align: center;

            .stat-number {
              display: block;
              font-size: 1.5rem;
              font-weight: 800;
              color: var(--accent-color);
              line-height: 1;
            }

            .stat-label {
              font-size: 0.8rem;
              opacity: 0.8;
            }
          }
        }

        .certifications {
          h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: var(--spacing-md);
            color: var(--accent-color);
          }

          .cert-logos {
            display: flex;
            gap: var(--spacing-md);

            @media (max-width: 768px) {
              justify-content: center;
            }

            img {
              height: 30px;
              opacity: 0.8;
              filter: brightness(0) invert(1);
              transition: opacity 0.3s ease;

              &:hover {
                opacity: 1;
              }
            }
          }
        }
      }

      /* Links Sections */
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;

          @media (max-width: 768px) {
            justify-content: center;
          }

          mat-icon {
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
            transition: transform 0.3s ease;
          }

          &:hover {
            color: var(--accent-color);
            transform: translateX(5px);

            @media (max-width: 768px) {
              transform: none;
            }

            mat-icon {
              transform: translateX(3px);
            }
          }
        }
      }

      /* Contact Section */
      .contact-section {
        .contact-info {
          margin-bottom: var(--spacing-xl);

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);

            @media (max-width: 768px) {
              justify-content: center;
            }

            .contact-icon {
              color: var(--accent-color);
              font-size: 1.2rem;
              width: 1.2rem;
              height: 1.2rem;
              margin-top: 2px;
              flex-shrink: 0;
            }

            .contact-details {
              display: flex;
              flex-direction: column;

              .contact-label {
                font-size: 0.8rem;
                opacity: 0.8;
                margin-bottom: var(--spacing-xs);
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }

              .contact-value {
                color: white;
                text-decoration: none;
                font-weight: 500;

                &:hover {
                  color: var(--accent-color);
                }
              }
            }
          }
        }

        .emergency-contact {
          padding: var(--spacing-lg);
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--border-radius-md);
          border-left: 4px solid var(--accent-color);

          @media (max-width: 768px) {
            text-align: center;
          }

          h5 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: var(--spacing-sm);
            color: var(--accent-color);
          }

          .emergency-number {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: white;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: var(--spacing-xs);

            @media (max-width: 768px) {
              justify-content: center;
            }

            &:hover {
              color: var(--accent-color);
            }
          }

          .emergency-note {
            font-size: 0.8rem;
            opacity: 0.8;
          }
        }
      }

      /* Social Media Section */
      .footer-social {
        padding: var(--spacing-xl) 0;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        .social-content {
          display: flex;
          justify-content: space-between;
          align-items: center;

          @media (max-width: 768px) {
            flex-direction: column;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .social-info {
            h4 {
              font-size: 1.1rem;
              font-weight: 600;
              margin-bottom: var(--spacing-xs);
              color: var(--accent-color);
            }

            p {
              opacity: 0.8;
              margin: 0;
            }
          }

          .social-links {
            display: flex;
            gap: var(--spacing-md);

            .social-link {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              text-decoration: none;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-3px) scale(1.1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
              }

              mat-icon {
                font-size: 1.2rem;
                width: 1.2rem;
                height: 1.2rem;
              }
            }
          }

          .newsletter-mini {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);

            @media (max-width: 768px) {
              flex-direction: column;
              gap: var(--spacing-sm);
            }

            span {
              font-weight: 500;
              opacity: 0.9;
            }

            .newsletter-btn {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              font-weight: 600;
              font-size: 0.9rem;
            }
          }
        }
      }

      /* Bottom Footer */
      .footer-bottom {
        padding: var(--spacing-lg) 0;
        background: rgba(0, 0, 0, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;

          @media (max-width: 1024px) {
            flex-direction: column;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .copyright {
            p {
              margin: 0;
              opacity: 0.8;

              &.legal-note {
                font-size: 0.8rem;
                margin-top: var(--spacing-xs);
              }
            }
          }

          .legal-links {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);

            @media (max-width: 768px) {
              flex-wrap: wrap;
              justify-content: center;
            }

            .legal-link {
              color: rgba(255, 255, 255, 0.8);
              text-decoration: none;
              font-size: 0.9rem;

              &:hover {
                color: var(--accent-color);
              }
            }

            .separator {
              opacity: 0.5;
            }
          }

          .payment-methods {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: var(--spacing-sm);

            @media (max-width: 1024px) {
              align-items: center;
            }

            .payment-label {
              font-size: 0.8rem;
              opacity: 0.8;
            }

            .payment-icons {
              display: flex;
              gap: var(--spacing-sm);

              img {
                height: 20px;
                opacity: 0.8;
                filter: brightness(0) invert(1);

                &:hover {
                  opacity: 1;
                }
              }
            }
          }
        }
      }

      /* Back to Top Button */
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        background: var(--accent-color);

        &.visible {
          opacity: 1;
          visibility: visible;
        }

        &:hover {
          transform: translateY(-3px);
          background: var(--accent-dark);
        }

        @media (max-width: 768px) {
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showBackToTop = false;

  quickLinks: FooterLink[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Buscar Abogados', route: '/abogados' },
    { label: 'Consulta Gratis', route: '/consulta' },
    { label: 'Blog Legal', route: '/blog' },
    { label: 'Sobre Nosotros', route: '/nosotros' },
    { label: 'Contacto', route: '/contacto' },
    { label: 'Preguntas Frecuentes', route: '/faq' },
    { label: 'Testimonios', route: '/testimonios' },
  ];

  legalServices: FooterLink[] = [
    { label: 'Derecho Civil', route: '/especialidades/civil' },
    { label: 'Derecho Penal', route: '/especialidades/penal' },
    { label: 'Derecho Laboral', route: '/especialidades/laboral' },
    { label: 'Derecho Familiar', route: '/especialidades/familiar' },
    { label: 'Derecho Corporativo', route: '/especialidades/corporativo' },
    { label: 'Derecho Inmobiliario', route: '/especialidades/inmobiliario' },
    { label: 'Derecho Tributario', route: '/especialidades/tributario' },
    { label: 'Ver Todas', route: '/especialidades' },
  ];

  socialLinks: SocialLink[] = [
    {
      platform: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com/portaldelabogado',
      color: '#1877F2',
    },
    {
      platform: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com/portaldelabogado',
      color: '#1DA1F2',
    },
    {
      platform: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/company/portaldelabogado',
      color: '#0A66C2',
    },
    {
      platform: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com/portaldelabogado',
      color: '#E4405F',
    },
    {
      platform: 'YouTube',
      icon: 'youtube',
      url: 'https://youtube.com/portaldelabogado',
      color: '#FF0000',
    },
  ];

  constructor() {
    // Detectar scroll para mostrar botón de "volver arriba"
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.showBackToTop = window.pageYOffset > 300;
      });
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
