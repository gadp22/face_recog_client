import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as faceapi from 'face-api.js'
import { ApiConsumerService } from '../services/api.consumer.service'
import { AppComponent } from '../app.component'
import { FaceRecognitionService } from '../services/face.recognition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    @ViewChild("video")
    public video: ElementRef

    @ViewChild("canvas")
    public canvas: ElementRef

    @ViewChild("img")
    public img: ElementRef

    @ViewChild("name")
    public name: ElementRef

    @ViewChild("distance")
    public distance: ElementRef

    @ViewChild("identified")
    public identified: ElementRef

    public recognition: any

    track: boolean
    trackStatus: string
    captureInterval: any
    faceOptions: any
    identifiedPersons: any[]
    registeredMembers: Array<any>

    public constructor(private api : ApiConsumerService,
                        private faceRecognition : FaceRecognitionService) {

        this.recognition = null
        this.track = false
        this.trackStatus = 'enable tracking'

        const inputSize = 640
        const scoreThreshold = 0.5

        this.identifiedPersons = []
        
        this.registeredMembers = []
        this.faceOptions = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    }

    public ngOnInit() { 
      console.log('initialising camera ...')
    
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              this.video.nativeElement.srcObject = stream
              this.video.nativeElement.play()
          })
      } 

      console.log('populating registered members ...')

      this.registeredMembers = this.faceRecognition.getRegisteredMembers()
    }
    
    public ngAfterViewInit() {
    }

    public drawCanvas() {
      let canvasElement = this.canvas.nativeElement
      let videoElement = this.video.nativeElement
      let ratio = window.innerWidth/window.outerWidth * 0.75

      canvasElement.setAttribute('width', videoElement.videoWidth * ratio)
      canvasElement.setAttribute('height', videoElement.videoHeight * ratio)

      let canvasContext = canvasElement.getContext("2d")

      canvasContext.drawImage(videoElement, 0, 0, videoElement.videoWidth * ratio, videoElement.videoHeight * ratio)
    }

    public enableTracking() {
        this.track = (this.track) ? false : true

        if (this.track) {
            this.captureInterval = setInterval(() => { this.capture() }, 300)
            this.trackStatus = 'disable tracking'
        } else { 
            clearInterval( this.captureInterval )
            this.trackStatus = 'enable tracking'
        }
    }   

    private async drawFaces() {
      console.log('detecting faces ...')

        let result = await faceapi.detectAllFaces(this.canvas.nativeElement, this.faceOptions).withFaceLandmarks().withFaceDescriptors()

        for (let i=0, len = result.length; i<len; i++) {
            console.log('recognising face ...')

            await faceapi.draw.drawFaceLandmarks(this.canvas.nativeElement, result.map(res => res.landmarks))

            this.recognition = await this.api.recognize(result[i].descriptor)

            if(this.track) {
                this.recognition.subscribe(dat => {
                    const drawOptions = {
                        label: dat.data.name,
                        lineWidth: 2
                    }
                    const drawBox = new faceapi.draw.DrawBox(result[i].detection.box, drawOptions)
                    drawBox.draw(this.canvas.nativeElement)
                })
            } else {
                this.recognition.subscribe(dat => {

                  AppComponent
                    let image = this.getImage(dat.data.id)
                    
                    let identifiedPerson = {}

                    identifiedPerson['name'] = dat.data.name
                    identifiedPerson['distance'] = dat.data.distance
                    identifiedPerson['image'] = image
                    
                    this.identifiedPersons.push(identifiedPerson)
                })
            }
        } 
    }

    public getImage(id :string) {
      for (let i=0, len = this.registeredMembers.length; i<len; i++) {
          if (this.registeredMembers[i]._id == id) {
              return this.registeredMembers[i]['image']
          }
      }
  }

    public async capture() {
        this.identifiedPersons = []

        await this.drawCanvas()
        await this.drawFaces()
    }
}
