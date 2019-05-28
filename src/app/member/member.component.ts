import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConsumerService } from '../services/api.consumer.service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.less']
})
export class MemberComponent implements OnInit {

  messageForm: FormGroup
  submitted = false
  success = false

  constructor(private formBuilder: FormBuilder,
              private api: ApiConsumerService) { }

  ngOnInit() {
      this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    let member = {}

    member['name'] = this.messageForm.controls.name.value
    member['image'] = this.messageForm.controls.image.value

    this.api.registerMember(member)

    this.success = true;
}

}
