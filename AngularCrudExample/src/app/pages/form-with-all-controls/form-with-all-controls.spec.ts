import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithAllControls } from './form-with-all-controls';

describe('FormWithAllControls', () => {
  let component: FormWithAllControls;
  let fixture: ComponentFixture<FormWithAllControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithAllControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWithAllControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
