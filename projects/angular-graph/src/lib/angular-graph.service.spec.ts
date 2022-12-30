import { TestBed } from '@angular/core/testing';

import { AngularGraphService } from './angular-graph.service';

describe('AngularGraphService', () => {
  let service: AngularGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
