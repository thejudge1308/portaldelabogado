// footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

interface FooterLink {
  label: string;
  route: string;
  external?: boolean;
}

interface SocialLink {
  platform: string;
  icon: any;
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
    FontAwesomeModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showBackToTop = false;

  whatsappIcon = faWhatsapp;

  quickLinks: FooterLink[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Servicios', route: '/servicios' },
    //{ label: 'Buscar Abogados', route: '/abogados' },
    //{ label: 'Consulta Gratis', route: '/consulta' },
    //{ label: 'Blog Legal', route: '/blog' },
    //{ label: 'Sobre Nosotros', route: '/nosotros' },
    { label: 'Contacto', route: '/contacto' },
    //{ label: 'Preguntas Frecuentes', route: '/faq' },
    //{ label: 'Testimonios', route: '/testimonios' },
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
      icon: faFacebook,
      url: 'https://facebook.com/portaldelabogado',
      color: '#1877F2',
    },
    {
      platform: 'Twitter',
      icon: faXTwitter,
      url: 'https://twitter.com/portaldelabogado',
      color: '#000',
    },
    {
      platform: 'LinkedIn',
      icon: faLinkedin,
      url: 'https://linkedin.com/company/portaldelabogado',
      color: '#0A66C2',
    },
    {
      platform: 'Instagram',
      icon: faInstagram,
      url: 'https://instagram.com/portaldelabogado',
      color: '#E4405F',
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
