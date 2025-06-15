import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainContainerComponent } from './home-main-container.component';

describe('HomeMainContainerComponent', () => {
  let component: HomeMainContainerComponent;
  let fixture: ComponentFixture<HomeMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMainContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
