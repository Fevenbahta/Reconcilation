import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InRtgsAtsComponent } from './in-rtgs-ats.component';

describe('InRtgsAtsComponent', () => {
  let component: InRtgsAtsComponent;
  let fixture: ComponentFixture<InRtgsAtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InRtgsAtsComponent]
    });
    fixture = TestBed.createComponent(InRtgsAtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
