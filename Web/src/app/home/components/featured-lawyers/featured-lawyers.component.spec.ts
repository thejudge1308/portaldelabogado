import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLawyersComponent } from './featured-lawyers.component';

describe('FeaturedLawyersComponent', () => {
  let component: FeaturedLawyersComponent;
  let fixture: ComponentFixture<FeaturedLawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedLawyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
