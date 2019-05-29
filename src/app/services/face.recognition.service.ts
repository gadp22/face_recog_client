import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js'

@Injectable({
  providedIn: 'root'
})

export class FaceRecognitionService {

  private registeredMembers: Array<any>
  private captureInterval: any

  constructor() { 
    this.registeredMembers = []
    this.captureInterval = null
  }

  public async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('assets/models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('assets/models')
  }

  public getRegisteredMembers() {
    return this.registeredMembers
  }

  public setRegisteredMembers(registeredMembers) {
    this.registeredMembers = registeredMembers
  }

  public getCaptureInterval() {
    return this.captureInterval
  }

  public setCaptureIntercal(captureInterval) {
    this.captureInterval = captureInterval
  }
}
