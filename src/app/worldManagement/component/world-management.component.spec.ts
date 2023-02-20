import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldManagementComponent } from './world-management.component';

describe('WorldMangementComponent', () => {
  let component: WorldManagementComponent;
  let fixture: ComponentFixture<WorldManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
