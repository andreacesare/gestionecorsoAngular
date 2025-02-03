import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpCorsoComponent } from './up-corso.component';

describe('UpCorsoComponent', () => {
  let component: UpCorsoComponent;
  let fixture: ComponentFixture<UpCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpCorsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
