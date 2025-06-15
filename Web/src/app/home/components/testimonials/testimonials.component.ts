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
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
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
