import { Component, OnInit } from '@angular/core'
import {FaceRecognitionService} from '../services/face.recognition.service'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  signupFormModalName = new FormControl('', Validators.required)
  signupFormModalEmail = new FormControl('', Validators.email)
  signupFormModalPassword = new FormControl('', Validators.required)

  registeredMembers : Array<any>

  public constructor(private faceRecognition : FaceRecognitionService, private router : Router) {
    this.registeredMembers = []
  }

  test() {
    this.router.navigateByUrl('/member')
  }

  ngOnInit() {
    this.registeredMembers = this.faceRecognition.getRegisteredMembers()
  }

}
