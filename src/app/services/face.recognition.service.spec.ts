import { TestBed } from '@angular/core/testing';

import { FaceRecognitionService } from './face.recognition.service';

describe('Face.RecognitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaceRecognitionService = TestBed.get(FaceRecognitionService);
    expect(service).toBeTruthy();
  });
});
