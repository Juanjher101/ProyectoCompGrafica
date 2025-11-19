import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPublicitarioComponent } from './card-publicitario.component';

describe('CardPublicitarioComponent', () => {
  let component: CardPublicitarioComponent;
  let fixture: ComponentFixture<CardPublicitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPublicitarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPublicitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
