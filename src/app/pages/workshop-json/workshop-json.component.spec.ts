import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopJsonComponent } from './workshop-json.component';

describe('WorkshopJsonComponent', () => {
  let component: WorkshopJsonComponent;
  let fixture: ComponentFixture<WorkshopJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
