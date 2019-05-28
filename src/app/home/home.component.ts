import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as faceapi from 'face-api.js'
import { ApiConsumerService } from '../services/api.consumer.service'
import { AppComponent } from '../app.component'
import { FaceRecognitionService } from '../services/face.recognition.service'
import Swal from 'sweetalert2'

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
    detectedName: string
    fps: number

    public constructor(private api : ApiConsumerService,
                        private faceRecognition : FaceRecognitionService) {

        const inputSize = 640
        const scoreThreshold = 0.5

        this.identifiedPersons = []
        
        this.registeredMembers = []
        this.faceOptions = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })

        console.log('populating registered members ...')
  
        this.registeredMembers = this.faceRecognition.getRegisteredMembers()
    }

    public ngOnInit() { 
        this.detectedName = 'ummm, wait a second, let me think ...'
        this.recognition = null
        this.track = false
        this.trackStatus = 'Ready? Let\'s Play the Game!'
        this.fps = 200

        clearInterval( this.captureInterval )

        console.log('initialising camera ...')
        
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream
                this.video.nativeElement.play()
            })
      } 
    }
    
    public ngAfterViewInit() {
    }

    public buttonYes() {
        this.api.rightAnswer()
        Swal.fire({
            type: 'success',
            title: 'Thanks a lot for your feedback!',
            text: 'Just as I said, I am awesome!',
            //footer: '<a href>Why do I have this issue?</a>'
          })
    }

    public buttonNo() {
        this.api.wrongAnswer()
        Swal.fire({
            type: 'success',
            title: 'Thanks a lot for your feedback!',
            text: 'I will learn harder from now on!',
            //footer: '<a href>Why do I have this issue?</a>'
          })
    }

    public toggleFPS(event) {
        this.fps = event.target.id

        this.captureInterval = setInterval(() => { this.capture() }, this.fps)
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
            this.captureInterval = setInterval(() => { this.capture() }, this.fps)
            this.trackStatus = 'Stop Guessing Me Please!'
        } else { 
            clearInterval( this.captureInterval )
            this.trackStatus = 'Ready? Let\'s Play the Game!'
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
                    if (dat.data.name == 'unknown') {
                        this.detectedName = 'ummm, wait a second, let me think ...'
                    } else {
                        this.detectedName = dat.data.name + ', right?!'
                    }
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
