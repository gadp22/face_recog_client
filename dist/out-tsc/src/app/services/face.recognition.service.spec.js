import { TestBed } from '@angular/core/testing';
import { FaceRecognitionService } from './face.recognition.service';
describe('Face.RecognitionService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FaceRecognitionService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=face.recognition.service.spec.js.map