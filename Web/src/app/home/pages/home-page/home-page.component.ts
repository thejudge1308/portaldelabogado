import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { LegalSpecialtiesComponent } from '../../components/legal-specialties/legal-specialties.component';
const component = [
  HeroSectionComponent,
  LegalSpecialtiesComponent,
  HowItWorksComponent,
];
@Component({
  selector: 'app-home-page',
  imports: [...component],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
