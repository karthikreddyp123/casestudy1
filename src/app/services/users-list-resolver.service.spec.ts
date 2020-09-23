import { TestBed } from '@angular/core/testing';

import { UsersListResolverService } from './users-list-resolver.service';

describe('UsersListResolverService', () => {
  let service: UsersListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
