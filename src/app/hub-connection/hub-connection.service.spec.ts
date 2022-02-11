import { TestBed } from '@angular/core/testing';

import { HubConnectionService } from './hub-connection.service';

describe('HubConnectionService', () => {
  let service: HubConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
