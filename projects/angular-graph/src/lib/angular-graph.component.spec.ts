import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGraphComponent } from './angular-graph.component';

describe('AngularGraphComponent', () => {
  let component: AngularGraphComponent;
  let fixture: ComponentFixture<AngularGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
