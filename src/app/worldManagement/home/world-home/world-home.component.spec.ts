import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldHomeComponent } from './world-home.component';

describe('WorldHomeComponent', () => {
  let component: WorldHomeComponent;
  let fixture: ComponentFixture<WorldHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
