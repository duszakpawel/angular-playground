import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsSearchComponent } from './cats-search.component';

describe('CatsSearchComponent', () => {
  let component: CatsSearchComponent;
  let fixture: ComponentFixture<CatsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
