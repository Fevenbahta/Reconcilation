import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InreconcilationComponent } from './inreconcilation.component';

describe('InreconcilationComponent', () => {
  let component: InreconcilationComponent;
  let fixture: ComponentFixture<InreconcilationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InreconcilationComponent]
    });
    fixture = TestBed.createComponent(InreconcilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
