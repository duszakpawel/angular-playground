import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentOneComponent } from './dynamic-component-one.component';

describe('DynamicComponentOneComponent', () => {
  let component: DynamicComponentOneComponent;
  let fixture: ComponentFixture<DynamicComponentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponentOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicComponentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
