import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLibComponent } from './playground-lib.component';

describe('SharedLibComponent', () => {
  let component: SharedLibComponent;
  let fixture: ComponentFixture<SharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
