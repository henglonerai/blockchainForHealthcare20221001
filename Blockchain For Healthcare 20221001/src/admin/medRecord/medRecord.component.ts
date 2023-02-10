import { Component, OnInit } from '@angular/core';
import { MedRecordService } from '../services/medRecord.service';

@Component({
  selector: 'app-medRecord',
  templateUrl: './medRecord.component.html',
  styleUrls: ['./medRecord.component.sass'],
})
export class MedRecordComponent implements OnInit {
  model: any = {
    patID: '',
    fName: 'test_name',
    lName: 'test_name',
    phone: '123456789',
    city: 'city',
    state: 'state',
  };

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success:boolean = false

  ipfs: any;

  constructor(private medRecordService: MedRecordService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.show = true
    this.msg_text = "Adding Medical Record to the Network..."
    console.log(this.model);
    this.checkAddProgress()
    this.medRecordService.addMedRecord(this.model.patID, this.model);
  }

  checkAddProgress(){
    console.log("Checking progress");
    
    let checkProgress = setInterval(() => {
      if(this.medRecordService.added){
        this.msg_text = "Medical Record Added to the network"
        this.success = true
        clearInterval(checkProgress)
      }
      if(this.medRecordService.failed){
        this.warn = true
        this.msg_text = "Medical Record adding Failed"
        clearInterval(checkProgress)
      }
    },500)
  }

  onClose() {
    this.show = false
    this.warn = false
  }
}
