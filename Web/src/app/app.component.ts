import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatsSectionComponent } from './stats-section/stats-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LegalSpecialtiesComponent } from './legal-specialties/legal-specialties.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FeaturedLawyersComponent } from './featured-lawyers/featured-lawyers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';

const components = [
  HeaderComponent,
  FooterComponent,
  StatsSectionComponent,
  HeroSectionComponent,
  LegalSpecialtiesComponent,
  HowItWorksComponent,
  FeaturedLawyersComponent,
  TestimonialsComponent,
  BlogPreviewComponent,
];
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Web';
}
