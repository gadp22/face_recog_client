import { TestBed } from '@angular/core/testing';

import { ApiConsumerService } from './api.consumer.service';

describe('Api.ConsumerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiConsumerService = TestBed.get(ApiConsumerService);
    expect(service).toBeTruthy();
  });
});
