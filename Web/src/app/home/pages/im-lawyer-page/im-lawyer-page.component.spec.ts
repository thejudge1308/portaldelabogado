import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImLawyerPageComponent } from './im-lawyer-page.component';

describe('ImLawyerPageComponent', () => {
  let component: ImLawyerPageComponent;
  let fixture: ComponentFixture<ImLawyerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImLawyerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImLawyerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
