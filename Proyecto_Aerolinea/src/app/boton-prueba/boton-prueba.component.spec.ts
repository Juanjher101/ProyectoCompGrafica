import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPruebaComponent } from './boton-prueba.component';

describe('BotonPruebaComponent', () => {
  let component: BotonPruebaComponent;
  let fixture: ComponentFixture<BotonPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonPruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
