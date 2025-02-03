import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpStudenteComponent } from './up-studente.component';

describe('UpStudenteComponent', () => {
  let component: UpStudenteComponent;
  let fixture: ComponentFixture<UpStudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpStudenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
