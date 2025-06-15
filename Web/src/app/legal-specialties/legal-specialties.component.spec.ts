import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSpecialtiesComponent } from './legal-specialties.component';

describe('LegalSpecialtiesComponent', () => {
  let component: LegalSpecialtiesComponent;
  let fixture: ComponentFixture<LegalSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalSpecialtiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
