import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLawyerPageComponent } from './register-lawyer-page.component';

describe('RegisterLawyerPageComponent', () => {
  let component: RegisterLawyerPageComponent;
  let fixture: ComponentFixture<RegisterLawyerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLawyerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLawyerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
