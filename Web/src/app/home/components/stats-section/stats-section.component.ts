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
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss'],
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
