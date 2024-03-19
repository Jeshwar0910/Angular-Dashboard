import { TestBed } from '@angular/core/testing';

import { NewToggleService } from './new-toggle.service';

describe('NewToggleService', () => {
  let service: NewToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
