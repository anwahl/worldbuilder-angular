import { TestBed } from '@angular/core/testing';

import { PoliticalSystemService } from './political-system.service';

describe('PoliticalSystemService', () => {
  let service: PoliticalSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticalSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
