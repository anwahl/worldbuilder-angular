import { TestBed } from '@angular/core/testing';

import { SocialClassService } from './social-class.service';

describe('SocialClassService', () => {
  let service: SocialClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
