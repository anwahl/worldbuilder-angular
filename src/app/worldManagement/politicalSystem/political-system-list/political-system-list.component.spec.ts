import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalSystemListComponent } from './political-system-list.component';

describe('PoliticalSystemListComponent', () => {
  let component: PoliticalSystemListComponent;
  let fixture: ComponentFixture<PoliticalSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalSystemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
