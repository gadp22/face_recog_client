import { Component, OnInit } from '@angular/core';
import { ApiConsumerService } from '../services/api.consumer.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.less']
})
export class AttendanceComponent implements OnInit {

  attendanceList : Array<any>

  public constructor(private api : ApiConsumerService, private router : Router) {
    this.attendanceList = []
  }

  ngOnInit() {
    let res :any = this.api.getAttendanceList()

    res.subscribe(dat => {
      let data = dat['data']

      for (let i=0, len = data.length; i<len; i++) {
          this.attendanceList.push(data[i])
      }

      console.log('done populating all attendances ...')
    })
  }
}
