import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
@Component({
  selector: 'app-services-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatRippleModule,
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {
  activeCategory: 'clients' | 'lawyers' = 'clients';

  setActiveCategory(category: 'clients' | 'lawyers') {
    this.activeCategory = category;
  }

  clientServices = [
    {
      title: 'Búsqueda Inteligente',
      description:
        'Encuentra abogados especializados usando filtros avanzados y algoritmos de matching.',
      icon: 'search',
      status: 'available',
      statusText: 'Disponible',
      features: ['Filtros avanzados', 'Geolocalización', 'Recomendaciones IA'],
    },
    {
      title: 'Seguimiento en Tiempo Real',
      description:
        'Monitorea el progreso de tu caso con actualizaciones automáticas y notificaciones.',
      icon: 'track_changes',
      status: 'available',
      statusText: 'Disponible',
      features: [
        'Dashboard personalizado',
        'Notificaciones',
        'Historial completo',
      ],
    },
    {
      title: 'Asesor Legal IA',
      description:
        'Consultas legales básicas respondidas al instante por inteligencia artificial.',
      icon: 'psychology',
      status: 'coming-soon',
      statusText: 'Próximamente',
      features: [
        'Respuestas 24/7',
        'Base legal actualizada',
        'Consultas ilimitadas',
      ],
    },
    {
      title: 'Chat Seguro',
      description:
        'Comunicación cifrada y confidencial con tu abogado desde cualquier dispositivo.',
      icon: 'chat_bubble_outline',
      status: 'coming-soon',
      statusText: 'Próximamente',
      features: ['Cifrado E2E', 'Archivos adjuntos', 'Videollamadas'],
    },
    /*{
      title: 'Comparador de Tarifas',
      description:
        'Compara honorarios y servicios de múltiples abogados para tomar la mejor decisión.',
      icon: 'compare_arrows',
      status: 'available',
      statusText: 'Disponible',
      features: [
        'Transparencia total',
        'Sin comisiones ocultas',
        'Múltiples cotizaciones',
      ],
    },*/
    {
      title: 'Documentos Legales',
      description:
        'Acceso a plantillas y documentos legales personalizables para casos comunes.',
      icon: 'description',
      status: 'available',
      statusText: 'Disponible',
      features: [
        'Plantillas validadas',
        'Personalización fácil',
        'Descarga inmediata',
      ],
    },
  ];

  lawyerServices = [
    {
      title: 'Digitalización Inteligente',
      description:
        'Convierte documentos físicos a digital con OCR avanzado y categorización automática.',
      icon: 'scanner',
      status: 'available',
      statusText: 'Disponible',
      features: ['OCR preciso', 'Búsqueda en texto', 'Organización automática'],
    },
    {
      title: 'Asistente Legal IA',
      description:
        'Herramientas de IA para redacción, revisión y análisis de documentos legales.',
      icon: 'auto_awesome',
      status: 'coming-soon',
      statusText: 'Próximamente',
      features: [
        'Redacción asistida',
        'Análisis de contratos',
        'Detección de errores',
      ],
    },
    {
      title: 'Agenda Inteligente',
      description:
        'Sistema de citas con sincronización automática y recordatorios personalizados.',
      icon: 'schedule',
      status: 'available',
      statusText: 'Disponible',
      features: [
        'Reservas 24/7',
        'Sincronización calendar',
        'Recordatorios automáticos',
      ],
    },
    {
      title: 'Sitio Web Profesional',
      description:
        'Crea tu presencia online con plantillas especializadas para abogados.',
      icon: 'web',
      status: 'available',
      statusText: 'Disponible',
      features: ['Diseño responsive', 'SEO optimizado', 'Actualización fácil'],
    },
    {
      title: 'CRM Legal',
      description:
        'Gestiona clientes, casos y cotizaciones desde un panel centralizado y profesional.',
      icon: 'business_center',
      status: 'available',
      statusText: 'Disponible',
      features: ['Panel unificado', 'Automatización', 'Reportes detallados'],
    },
    {
      title: 'Facturación Automática',
      description:
        'Sistema inteligente que calcula honorarios y genera facturas automáticamente.',
      icon: 'receipt_long',
      status: 'coming-soon',
      statusText: 'Próximamente',
      features: [
        'Cálculo por horas',
        'Facturas automáticas',
        'Integración contable',
      ],
    },
  ];
}
