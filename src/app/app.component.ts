import { Component, OnInit } from '@angular/core'
import * as faceapi from 'face-api.js'
import { FaceRecognitionService } from './services/face.recognition.service'
import { ApiConsumerService } from './services/api.consumer.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
    
    private registeredMembers: Array<any>

    public constructor(private faceRecognition : FaceRecognitionService,
                        private api : ApiConsumerService) {}

    public ngOnInit() { }

    public async ngAfterViewInit() {
        console.log('getting all registered members ...')
        
        await this.getMembers()

        console.log('loading models ...')
    
        this.faceRecognition.loadModels()

        console.log('all models have been successfully loaded ...')   
    }

    public async getMembers(...id :any) {
        this.registeredMembers = []

        let res :any = await this.api.getMembers()

        await res.subscribe(dat => {
            let data = dat['data']

            for (let i=0, len = data.length; i<len; i++) {
                this.registeredMembers.push(data[i])
            }

            this.faceRecognition.setRegisteredMembers(this.registeredMembers)

            console.log('done populating all registered members ...')
        })
    }
}
