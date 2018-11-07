import { TestBed } from '@angular/core/testing';

import { SignService } from './sign.service';

describe('SignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignService = TestBed.get(SignService);
    expect(service).toBeTruthy();
  });
});
