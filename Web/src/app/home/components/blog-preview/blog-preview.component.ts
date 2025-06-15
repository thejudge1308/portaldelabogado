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
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
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
