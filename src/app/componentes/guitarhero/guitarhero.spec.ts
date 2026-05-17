import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guitarhero } from './guitarhero';

describe('Guitarhero', () => {
  let component: Guitarhero;
  let fixture: ComponentFixture<Guitarhero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guitarhero],
    }).compileComponents();

    fixture = TestBed.createComponent(Guitarhero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
