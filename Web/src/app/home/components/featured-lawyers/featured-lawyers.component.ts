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
  templateUrl: './featured-lawyers.component.html',
  styleUrls: ['./featured-lawyers.component.scss'],
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
