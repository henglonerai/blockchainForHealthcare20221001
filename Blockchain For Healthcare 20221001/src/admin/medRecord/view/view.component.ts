import {
  Component,
  OnInit
} from '@angular/core';
import { MedRecordService } from 'src/admin/services/medRecord.service';

@Component({
  selector: 'medRecord-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass'],
})
export class MedRecordViewComponent implements OnInit {
  model: any = {
    acID: '',
  };

  MedRecordIds: string[] = [];

  MedRecord: any = {
    medRecordID: '',
    fName: 'First Name',
    lName: 'Last Name',
    Doj: '',
    emailID: 'test_name@mail.com',
    phone: '123456789',
    city: 'city',
    state: 'state',
    speciality: 'speciality',
    imageHash: '',
  };

  MedRecordDetails: any = [];

  loaded: boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn: boolean = false;
  progressMsg: string = ''


  constructor(private medRecordService: MedRecordService) {
    this.progressMsg = 'Loading Medical Records From Blockchain'
  }

  ngOnInit(): void {
    this.GetMedRecordIds()
  }

  loadMedRecordDetails() {
    console.log(this.MedRecordIds);
    this.MedRecordDetails = []
    
    let dataList: any = []
    let dataListLen: number = 0

    for (var i = 0; i <= this.MedRecordIds.length; i++) {
      if (this.MedRecordIds[i])
        this.medRecordService.getMedRecordDetails(this.MedRecordIds[i]).then((data: any) => {
          //this.MedRecordDetails.push(data)
          
          //console.log(data);
          const index = this.MedRecordIds.findIndex((element) => element == data.mrID)
          console.log("Got Patient " + index);
          dataList[index] = data
          dataListLen++

          if (dataListLen == this.MedRecordIds.length) {
            for (var k = 0; k < dataList.length; k++) {
              this.MedRecordDetails.push(dataList[k])
            }
          }
        });
    }
    this.progressMsg = ''
    this.showProgressCard = false
  }

  GetMedRecordIds(): any {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = ''
    this.loadComplete = false

    if (this.MedRecordDetails.length >= 1) {
      this.showProgressCard = false
      return 0
    }

    this.medRecordService.getMedRecordIds().then((medRecordIds: any) => {
      this.MedRecordIds = medRecordIds
      if (this.MedRecordIds.length >= 1) {
        this.loadMedRecordDetails();
        this.progressMsg = "Found " + this.MedRecordIds.length + " Accounts"
      }
      else {
        this.progressMsg = 'No MedRecords in the Network....'
        this.loadComplete = true
        this.showProgressCard = false
      }
    })

  }
}
