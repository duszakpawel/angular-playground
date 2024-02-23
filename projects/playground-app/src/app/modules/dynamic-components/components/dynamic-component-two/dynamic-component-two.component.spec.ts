import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentTwoComponent } from './dynamic-component-two.component';

describe('DynamicComponentTwoComponent', () => {
  let component: DynamicComponentTwoComponent;
  let fixture: ComponentFixture<DynamicComponentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponentTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicComponentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
