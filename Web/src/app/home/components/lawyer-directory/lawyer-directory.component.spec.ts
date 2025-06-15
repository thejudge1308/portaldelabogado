import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerDirectoryComponent } from './lawyer-directory.component';

describe('LawyerDirectoryComponent', () => {
  let component: LawyerDirectoryComponent;
  let fixture: ComponentFixture<LawyerDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
