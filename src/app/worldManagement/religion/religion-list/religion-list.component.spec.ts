import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionListComponent } from './religion-list.component';

describe('ReligionListComponent', () => {
  let component: ReligionListComponent;
  let fixture: ComponentFixture<ReligionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReligionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
