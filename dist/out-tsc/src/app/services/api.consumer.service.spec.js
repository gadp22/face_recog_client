import { TestBed } from '@angular/core/testing';
import { ApiConsumerService } from './api.consumer.service';
describe('Api.ConsumerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ApiConsumerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api.consumer.service.spec.js.map