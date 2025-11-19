import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVuelosComponent } from './card-vuelos.component';

describe('CardVuelosComponent', () => {
  let component: CardVuelosComponent;
  let fixture: ComponentFixture<CardVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVuelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
