import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutRtgsAtsComponent } from './out-rtgs-ats.component';

describe('OutRtgsAtsComponent', () => {
  let component: OutRtgsAtsComponent;
  let fixture: ComponentFixture<OutRtgsAtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutRtgsAtsComponent]
    });
    fixture = TestBed.createComponent(OutRtgsAtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
