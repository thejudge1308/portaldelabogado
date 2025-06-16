import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';
const components = [HeaderComponent, FooterComponent];

@Component({
  selector: 'app-home-main-container',
  imports: [RouterOutlet, ...components],
  templateUrl: './home-main-container.component.html',
  styleUrl: './home-main-container.component.scss',
})
export class HomeMainContainerComponent {}
