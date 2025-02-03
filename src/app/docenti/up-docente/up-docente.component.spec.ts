import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDocenteComponent } from './up-docente.component';

describe('UpDocenteComponent', () => {
  let component: UpDocenteComponent;
  let fixture: ComponentFixture<UpDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
