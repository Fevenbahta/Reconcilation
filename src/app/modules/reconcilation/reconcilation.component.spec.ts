import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcilationComponent } from './reconcilation.component';

describe('ReconcilationComponent', () => {
  let component: ReconcilationComponent;
  let fixture: ComponentFixture<ReconcilationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconcilationComponent]
    });
    fixture = TestBed.createComponent(ReconcilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
