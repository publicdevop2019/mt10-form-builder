import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableCheckboxComponent } from './observable-checkbox.component';

describe('ObservableCheckboxComponent', () => {
  let component: ObservableCheckboxComponent;
  let fixture: ComponentFixture<ObservableCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
