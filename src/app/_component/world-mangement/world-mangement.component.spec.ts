import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMangementComponent } from './world-mangement.component';

describe('WorldMangementComponent', () => {
  let component: WorldMangementComponent;
  let fixture: ComponentFixture<WorldMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldMangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
