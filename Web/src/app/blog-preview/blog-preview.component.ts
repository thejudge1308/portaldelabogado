// blog-preview.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: number;
  imageUrl: string;
  category: string;
  tags: string[];
  views: number;
  featured: boolean;
}

@Component({
  selector: 'app-blog-preview',
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
    <section class="blog-section">
      <div class="container">
        <div class="section-header">
          <h2>Recursos Legales y Blog</h2>
          <p>
            Mantente informado con nuestros artículos especializados y guías
            legales actualizadas
          </p>
        </div>

        <!-- Featured Article -->
        <div class="featured-article" *ngIf="featuredPost">
          <mat-card class="featured-card">
            <div class="featured-content">
              <div class="featured-text">
                <div class="article-meta">
                  <mat-chip class="category-chip featured-chip">{{
                    featuredPost.category
                  }}</mat-chip>
                  <span class="featured-badge">
                    <mat-icon>star</mat-icon>
                    Destacado
                  </span>
                </div>

                <h3 class="featured-title">{{ featuredPost.title }}</h3>
                <p class="featured-excerpt">{{ featuredPost.excerpt }}</p>

                <div class="article-info">
                  <div class="author-info">
                    <img
                      [src]="featuredPost.authorImage"
                      [alt]="featuredPost.author"
                      class="author-avatar"
                      loading="lazy"
                    />
                    <div class="author-details">
                      <span class="author-name">{{ featuredPost.author }}</span>
                      <div class="meta-info">
                        <span class="publish-date">{{
                          featuredPost.publishDate
                        }}</span>
                        <span class="separator">•</span>
                        <span class="read-time"
                          >{{ featuredPost.readTime }} min lectura</span
                        >
                        <span class="separator">•</span>
                        <span class="views"
                          >{{ featuredPost.views }} vistas</span
                        >
                      </div>
                    </div>
                  </div>

                  <button
                    class="btn-primary read-btn"
                    [routerLink]="['/blog', featuredPost.id]"
                  >
                    <mat-icon>article</mat-icon>
                    Leer Artículo
                  </button>
                </div>
              </div>

              <div class="featured-image">
                <img
                  [src]="featuredPost.imageUrl"
                  [alt]="featuredPost.title"
                  loading="lazy"
                />
                <div class="image-overlay"></div>
              </div>
            </div>
          </mat-card>
        </div>

        <!-- Recent Articles Grid -->
        <div class="articles-grid">
          <h3 class="grid-title">Artículos Recientes</h3>

          <div class="articles-container">
            <mat-card
              *ngFor="let post of recentPosts"
              class="article-card"
              [routerLink]="['/blog', post.id]"
            >
              <div class="article-image">
                <img [src]="post.imageUrl" [alt]="post.title" loading="lazy" />
                <div class="image-overlay">
                  <mat-chip class="category-chip">{{ post.category }}</mat-chip>
                </div>
              </div>

              <mat-card-content class="article-content">
                <h4 class="article-title">{{ post.title }}</h4>
                <p class="article-excerpt">{{ post.excerpt }}</p>

                <div class="article-tags" *ngIf="post.tags.length > 0">
                  <mat-chip-set>
                    <mat-chip
                      *ngFor="let tag of post.tags.slice(0, 3)"
                      class="tag-chip"
                    >
                      {{ tag }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </mat-card-content>

              <mat-card-footer class="article-footer">
                <div class="footer-author">
                  <img
                    [src]="post.authorImage"
                    [alt]="post.author"
                    class="footer-avatar"
                    loading="lazy"
                  />
                  <div class="footer-info">
                    <span class="footer-author-name">{{ post.author }}</span>
                    <span class="footer-date">{{ post.publishDate }}</span>
                  </div>
                </div>

                <div class="footer-meta">
                  <div class="meta-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{ post.readTime }} min</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>visibility</mat-icon>
                    <span>{{ post.views }}</span>
                  </div>
                </div>
              </mat-card-footer>
            </mat-card>
          </div>
        </div>

        <!-- Newsletter Subscription -->
        <div class="newsletter-section">
          <mat-card class="newsletter-card">
            <div class="newsletter-content">
              <div class="newsletter-info">
                <mat-icon class="newsletter-icon">email</mat-icon>
                <div class="newsletter-text">
                  <h3>Suscríbete a nuestro Newsletter Legal</h3>
                  <p>
                    Recibe semanalmente los últimos cambios en la legislación
                    chilena y consejos legales prácticos
                  </p>
                </div>
              </div>

              <div class="newsletter-form">
                <div class="form-group">
                  <input
                    type="email"
                    placeholder="Tu email aquí"
                    class="newsletter-input"
                  /><!--TODO: [(ngModel)]="newsletterEmail"-->
                  <button
                    class="btn-accent subscribe-btn"
                    (click)="subscribeNewsletter()"
                  >
                    <mat-icon>send</mat-icon>
                    Suscribirse
                  </button>
                </div>
                <p class="newsletter-disclaimer">
                  <mat-icon>security</mat-icon>
                  No spam. Puedes cancelar cuando quieras.
                </p>
              </div>
            </div>
          </mat-card>
        </div>

        <!-- View All Button -->
        <div class="section-footer">
          <button class="btn-secondary view-all-btn" routerLink="/blog">
            <mat-icon>library_books</mat-icon>
            Ver Todos los Artículos
          </button>

          <div class="blog-stats">
            <div class="stat">
              <span class="stat-number">500+</span>
              <span class="stat-label">Artículos</span>
            </div>
            <div class="stat">
              <span class="stat-number">50k+</span>
              <span class="stat-label">Lectores</span>
            </div>
            <div class="stat">
              <span class="stat-number">24h</span>
              <span class="stat-label">Actualización</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .blog-section {
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

      /* Featured Article */
      .featured-article {
        margin-bottom: var(--spacing-2xl);

        .featured-card {
          background: white;
          border-radius: var(--border-radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          border: 2px solid var(--primary-lighter);

          .featured-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 400px;

            @media (max-width: 968px) {
              grid-template-columns: 1fr;
            }
          }
        }

        .featured-text {
          padding: var(--spacing-2xl);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          @media (max-width: 968px) {
            padding: var(--spacing-xl);
          }

          .article-meta {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);

            .featured-chip {
              background: var(--primary-color);
              color: white;
              font-weight: 600;
            }

            .featured-badge {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              color: var(--accent-color);
              font-weight: 600;
              font-size: 0.9rem;

              mat-icon {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
              }
            }
          }

          .featured-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.2;
            margin-bottom: var(--spacing-md);

            @media (max-width: 768px) {
              font-size: 1.5rem;
            }
          }

          .featured-excerpt {
            font-size: 1.1rem;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: var(--spacing-lg);
          }

          .article-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            @media (max-width: 768px) {
              flex-direction: column;
              gap: var(--spacing-md);
              align-items: flex-start;
            }

            .author-info {
              display: flex;
              align-items: center;
              gap: var(--spacing-md);

              .author-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--primary-lighter);
              }

              .author-details {
                .author-name {
                  font-weight: 700;
                  color: var(--text-primary);
                  display: block;
                  margin-bottom: var(--spacing-xs);
                }

                .meta-info {
                  font-size: 0.9rem;
                  color: var(--text-secondary);

                  .separator {
                    margin: 0 var(--spacing-xs);
                  }
                }
              }
            }

            .read-btn {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              font-weight: 600;
            }
          }
        }

        .featured-image {
          position: relative;
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
              45deg,
              rgba(30, 58, 138, 0.1) 0%,
              transparent 100%
            );
          }

          &:hover img {
            transform: scale(1.05);
          }
        }
      }

      /* Articles Grid */
      .articles-grid {
        margin-bottom: var(--spacing-2xl);

        .grid-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-xl);
          text-align: center;
        }

        .articles-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-xl);

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
        }
      }

      .article-card {
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
        border: 2px solid transparent;

        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);

          .article-image img {
            transform: scale(1.05);
          }
        }

        .article-image {
          position: relative;
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
            top: var(--spacing-md);
            left: var(--spacing-md);

            .category-chip {
              background: rgba(30, 58, 138, 0.9);
              color: white;
              font-weight: 600;
              backdrop-filter: blur(10px);
            }
          }
        }

        .article-content {
          padding: var(--spacing-lg);

          .article-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.3;
            margin-bottom: var(--spacing-sm);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .article-excerpt {
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: var(--spacing-md);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .article-tags {
            mat-chip-set {
              display: flex;
              flex-wrap: wrap;
              gap: var(--spacing-xs);

              .tag-chip {
                font-size: 0.75rem;
                background: var(--background-secondary);
                color: var(--text-secondary);
              }
            }
          }
        }

        .article-footer {
          padding: var(--spacing-md) var(--spacing-lg);
          background: var(--background-secondary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-light);

          .footer-author {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);

            .footer-avatar {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              object-fit: cover;
            }

            .footer-info {
              display: flex;
              flex-direction: column;

              .footer-author-name {
                font-weight: 600;
                font-size: 0.9rem;
                color: var(--text-primary);
                line-height: 1;
              }

              .footer-date {
                font-size: 0.8rem;
                color: var(--text-secondary);
                line-height: 1;
              }
            }
          }

          .footer-meta {
            display: flex;
            gap: var(--spacing-md);

            .meta-item {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              font-size: 0.8rem;
              color: var(--text-secondary);

              mat-icon {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
              }
            }
          }
        }
      }

      /* Newsletter Section */
      .newsletter-section {
        margin-bottom: var(--spacing-2xl);

        .newsletter-card {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--primary-light)
          );
          color: white;
          border-radius: var(--border-radius-lg);
          overflow: hidden;

          .newsletter-content {
            padding: var(--spacing-2xl);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
            align-items: center;

            @media (max-width: 768px) {
              grid-template-columns: 1fr;
              padding: var(--spacing-xl);
              text-align: center;
            }

            .newsletter-info {
              display: flex;
              gap: var(--spacing-lg);
              align-items: center;

              @media (max-width: 768px) {
                flex-direction: column;
                text-align: center;
              }

              .newsletter-icon {
                font-size: 3rem;
                width: 3rem;
                height: 3rem;
                color: var(--accent-color);
                flex-shrink: 0;
              }

              .newsletter-text {
                h3 {
                  font-size: 1.5rem;
                  font-weight: 700;
                  margin-bottom: var(--spacing-sm);
                }

                p {
                  opacity: 0.9;
                  line-height: 1.5;
                }
              }
            }

            .newsletter-form {
              .form-group {
                display: flex;
                gap: var(--spacing-sm);
                margin-bottom: var(--spacing-sm);

                @media (max-width: 768px) {
                  flex-direction: column;
                }

                .newsletter-input {
                  flex: 1;
                  padding: var(--spacing-md);
                  border: none;
                  border-radius: var(--border-radius-md);
                  font-size: 1rem;

                  &:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
                  }
                }

                .subscribe-btn {
                  display: flex;
                  align-items: center;
                  gap: var(--spacing-sm);
                  font-weight: 600;
                  white-space: nowrap;
                }
              }

              .newsletter-disclaimer {
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
                font-size: 0.85rem;
                opacity: 0.8;

                @media (max-width: 768px) {
                  justify-content: center;
                }

                mat-icon {
                  font-size: 1rem;
                  width: 1rem;
                  height: 1rem;
                }
              }
            }
          }
        }
      }

      /* Section Footer */
      .section-footer {
        text-align: center;

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 600;
          font-size: 1.1rem;
          padding: var(--spacing-md) var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }

        .blog-stats {
          display: flex;
          justify-content: center;
          gap: var(--spacing-2xl);

          @media (max-width: 768px) {
            gap: var(--spacing-lg);
          }

          .stat {
            text-align: center;

            .stat-number {
              display: block;
              font-size: 1.8rem;
              font-weight: 800;
              color: var(--primary-color);
              margin-bottom: var(--spacing-xs);
            }

            .stat-label {
              font-size: 0.9rem;
              color: var(--text-secondary);
            }
          }
        }
      }
    `,
  ],
})
export class BlogPreviewComponent {
  newsletterEmail = '';

  featuredPost: BlogPost = {
    id: 'featured-1',
    title:
      'Nueva Ley de Protección de Datos Personales: Lo que debes saber en 2024',
    excerpt:
      'Análisis completo de los cambios en la legislación chilena sobre protección de datos y cómo afecta a empresas y ciudadanos. Incluye guía práctica de implementación.',
    content: '',
    author: 'María González Pérez',
    authorImage: 'https://picsum.photos/150/150?random=31',
    publishDate: '15 de Diciembre, 2024',
    readTime: 8,
    imageUrl: 'https://picsum.photos/600/400?random=31',
    category: 'Derecho Digital',
    tags: ['Protección de Datos', 'GDPR', 'Privacidad', 'Compliance'],
    views: 2847,
    featured: true,
  };

  recentPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'Guía Completa para Despidos Justificados en Chile',
      excerpt:
        'Todo lo que empleadores y trabajadores deben saber sobre los procedimientos legales de despido según la legislación laboral vigente.',
      content: '',
      author: 'Roberto Fernández Muñoz',
      authorImage: 'https://picsum.photos/150/150?random=32',
      publishDate: '12 de Diciembre, 2024',
      readTime: 6,
      imageUrl: 'https://picsum.photos/400/250?random=32',
      category: 'Derecho Laboral',
      tags: ['Despidos', 'Laboral', 'Empleadores'],
      views: 1523,
      featured: false,
    },
    {
      id: 'post-2',
      title: 'Divorcio de Mutuo Acuerdo: Proceso Simplificado 2024',
      excerpt:
        'Pasos actualizados para tramitar un divorcio de común acuerdo, documentos necesarios y plazos según las últimas modificaciones legales.',
      content: '',
      author: 'Ana Martínez López',
      authorImage: 'https://picsum.photos/150/150?random=33',
      publishDate: '10 de Diciembre, 2024',
      readTime: 5,
      imageUrl: 'https://picsum.photos/400/250?random=33',
      category: 'Derecho Familiar',
      tags: ['Divorcio', 'Familia', 'Trámites'],
      views: 2104,
      featured: false,
    },
    {
      id: 'post-3',
      title: 'Constitución de SPA: Ventajas y Desventajas',
      excerpt:
        'Análisis detallado de las Sociedades por Acciones Simplificadas, sus beneficios tributarios y consideraciones importantes para emprendedores.',
      content: '',
      author: 'Patricia Sánchez Torres',
      authorImage: 'https://picsum.photos/150/150?random=34',
      publishDate: '8 de Diciembre, 2024',
      readTime: 7,
      imageUrl: 'https://picsum.photos/400/250?random=34',
      category: 'Derecho Corporativo',
      tags: ['SPA', 'Sociedades', 'Emprendimiento'],
      views: 987,
      featured: false,
    },
    {
      id: 'post-4',
      title: 'Defensa en Casos de Violencia Intrafamiliar',
      excerpt:
        'Protocolo de actuación, derechos de las víctimas y procedimientos legales en casos de VIF según las últimas reformas procesales.',
      content: '',
      author: 'Carlos Rodríguez Silva',
      authorImage: 'https://picsum.photos/150/150?random=35',
      publishDate: '5 de Diciembre, 2024',
      readTime: 9,
      imageUrl: 'https://picsum.photos/400/250?random=35',
      category: 'Derecho Penal',
      tags: ['VIF', 'Víctimas', 'Protección'],
      views: 1756,
      featured: false,
    },
    {
      id: 'post-5',
      title: 'Compraventa de Propiedades: Checklist Legal 2024',
      excerpt:
        'Lista completa de verificaciones legales necesarias antes de comprar una propiedad, documentos esenciales y posibles riesgos.',
      content: '',
      author: 'Luis Herrera Campos',
      authorImage: 'https://picsum.photos/150/150?random=36',
      publishDate: '3 de Diciembre, 2024',
      readTime: 6,
      imageUrl: 'https://picsum.photos/400/250?random=36',
      category: 'Derecho Inmobiliario',
      tags: ['Propiedades', 'Compraventa', 'Inmobiliario'],
      views: 1342,
      featured: false,
    },
    {
      id: 'post-6',
      title: 'Nuevas Regulaciones Tributarias para Pymes',
      excerpt:
        'Cambios en la tributación para pequeñas y medianas empresas, beneficios disponibles y obligaciones que debes cumplir en 2024.',
      content: '',
      author: 'Carmen Torres Ruiz',
      authorImage: 'https://picsum.photos/150/150?random=37',
      publishDate: '1 de Diciembre, 2024',
      readTime: 8,
      imageUrl: 'https://picsum.photos/400/250?random=37',
      category: 'Derecho Tributario',
      tags: ['Pymes', 'Tributario', 'Beneficios'],
      views: 2231,
      featured: false,
    },
  ];

  subscribeNewsletter() {
    if (this.newsletterEmail && this.newsletterEmail.includes('@')) {
      console.log('Suscripción al newsletter:', this.newsletterEmail);
      // Aquí implementarías la lógica de suscripción
      alert('¡Gracias por suscribirte! Recibirás nuestro newsletter semanal.');
      this.newsletterEmail = '';
    } else {
      alert('Por favor ingresa un email válido.');
    }
  }
}
