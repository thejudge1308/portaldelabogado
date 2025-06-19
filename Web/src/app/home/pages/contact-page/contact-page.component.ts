import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-contact-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  currentBenefitIndex = 0;
  private benefitInterval: any;

  // Datos dinámicos
  lawyerBenefits = [
    {
      icon: 'business_center',
      title: 'Automatiza tu trabajo',
      description:
        'Pronto podrás automatizar tareas repetitivas y enfocarte en lo que realmente importa',
    },
    /*{
      icon: 'trending_up',
      title: 'Incrementa tus ingresos hasta 40%',
      description:
        'Accede a más clientes y optimiza tu tiempo con herramientas inteligentes',
    },*/
    /*{
      icon: 'schedule',
      title: 'Ahorra 15 horas semanales',
      description:
        'Automatiza tareas administrativas y enfócate en lo que realmente importa',
    },*/
    {
      icon: 'psychology',
      title: 'IA que potencia tu trabajo',
      description:
        'Asistente legal inteligente para redacción y análisis de documentos',
    },
    /*{
      icon: 'people',
      title: 'Red de más de 1,000 abogados',
      description:
        'Conecta con colegas, comparte experiencias y crece profesionalmente',
    },*/
    {
      icon: 'verified',
      title: 'Abogados verificados por el Poder Judicial',
      description:
        'Aumenta tu credibilidad con nuestro sello de abogado verificado por el Poder Judicial',
    },
  ];

  stats = [
    { number: '13', label: 'Abogados activos' },
    { number: '4', label: 'Casos exitosos' },
    { number: '98%', label: 'Satisfacción' },
  ];

  floatingIcons = [
    { name: 'gavel', delay: '0s' },
    { name: 'balance', delay: '1s' },
    { name: 'description', delay: '2s' },
    { name: 'verified_user', delay: '3s' },
    { name: 'business_center', delay: '4s' },
  ];

  contactMethods = [
    {
      icon: 'email',
      title: 'Correo Electrónico',
      description: 'Respuesta en menos de 24 horas',
      value: 'contacto@portaldelabogado.cl',
    },
    {
      icon: 'phone',
      title: 'Teléfono',
      description: 'Atención directa e inmediata',
      value: '+56 2 2234 5678',
    },
    {
      icon: 'chat',
      title: 'Mesa de ayuda',
      description: 'Soporte en línea via WhatsApp',
      value: 'Disponible 9:00 - 18:00',
    },
  ];

  contactReasons = [
    { value: 'suggestion', label: 'Sugerencia', icon: 'lightbulb' },
    { value: 'problem', label: 'Problema técnico', icon: 'bug_report' },
    { value: 'question', label: 'Duda o consulta', icon: 'help' },
    { value: 'partnership', label: 'Alianza comercial', icon: 'handshake' },
    { value: 'demo', label: 'Solicitar demo', icon: 'play_circle' },
    { value: 'other', label: 'Otro motivo', icon: 'more_horiz' },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      userType: ['client', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      reason: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    this.startBenefitRotation();
  }

  ngOnDestroy() {
    if (this.benefitInterval) {
      clearInterval(this.benefitInterval);
    }
  }

  private startBenefitRotation() {
    this.benefitInterval = setInterval(() => {
      this.currentBenefitIndex =
        (this.currentBenefitIndex + 1) % this.lawyerBenefits.length;
    }, 4000);
  }

  trackByIcon(index: number, icon: any) {
    return icon.name;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      try {
        // Simular envío
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.snackBar.open(
          '¡Mensaje enviado exitosamente! Te responderemos pronto.',
          'Cerrar',
          {
            duration: 5000,
            panelClass: ['success-snackbar'],
          }
        );

        this.resetForm();
      } catch (error) {
        this.snackBar.open(
          'Error al enviar el mensaje. Por favor intenta nuevamente.',
          'Cerrar',
          {
            duration: 5000,
            panelClass: ['error-snackbar'],
          }
        );
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  resetForm() {
    this.contactForm.reset({
      userType: 'client',
    });
  }
}
