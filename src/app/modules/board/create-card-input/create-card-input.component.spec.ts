import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardInputComponent } from './create-card-input.component';

describe('CreateCardInputComponent', () => {
  let component: CreateCardInputComponent;
  let fixture: ComponentFixture<CreateCardInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCardInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
