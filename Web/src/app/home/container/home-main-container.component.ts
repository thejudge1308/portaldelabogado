import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';
import { LegalSpecialtiesComponent } from '../components/legal-specialties/legal-specialties.component';
import { RouterOutlet } from '@angular/router';

const components = [
  HeaderComponent,
  FooterComponent,
  //StatsSectionComponent,
  HeroSectionComponent,
  LegalSpecialtiesComponent,
  HowItWorksComponent,
  //FeaturedLawyersComponent,
  //TestimonialsComponent,
  //BlogPreviewComponent,
];

@Component({
  selector: 'app-home-main-container',
  imports: [RouterOutlet, ...components],
  templateUrl: './home-main-container.component.html',
  styleUrl: './home-main-container.component.scss',
})
export class HomeMainContainerComponent {}
