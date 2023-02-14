import {
  Component,
  OnInit
} from '@angular/core';
import { DoctorService } from 'src/admin/services/doctor.service';

@Component({
  selector: 'doctor-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass'],
})
export class ViewComponent implements OnInit {
  model: any = {
    acID: '',
  };

  Doctors: string[] = [];

  Doctor: any = {
    docID: '',
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

  DoctorDetails: any = [];

  loaded: boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn: boolean = false;
  progressMsg: string = ''


  constructor(private doctorService: DoctorService) {
    this.progressMsg = 'Loading Doctor Accounts From Blockchain'

    this.DoctorDetails = doctorService.DoctorDetails
  }

  ngOnInit(): void {
    this.GetDoctors()
  }

  loadDrDetails() {
    console.log(this.Doctors);

    this.DoctorDetails = []

    let dataList: any = []
    let dataListLen: number = 0

    for (var i = 0; i <= this.Doctors.length; i++) {
      if (this.Doctors[i])
        this.doctorService.getDoctorDetails(this.Doctors[i]).then((data: any) => {
          //this.DoctorDetails.push(data)

          // Store the incoming data to dataList with the order same as this.Doctors
          // Get the index using the docID available in the data
          const index = this.Doctors.findIndex((element) => element == data.docID)
          console.log("Got Doctor " + index);
          dataList[index] = data
          dataListLen++

          // Detect if the dataList is full
          if (dataListLen == this.Doctors.length) {
            // If the dataList is full, print these data in ascending order
            for (var k = 0; k < dataList.length; k++) {
              this.DoctorDetails.push(dataList[k])
            }
          }
        });
    }
    this.progressMsg = ''
    this.showProgressCard = false
  }

  GetDoctors(): any {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = ''
    this.loadComplete = false

	  //console.log("From view.component.ts, GetDoctors(),  Line 71");
	  //console.log(this.DoctorDetails);

    if (this.DoctorDetails.length >= 1) {
      this.showProgressCard = false
      return 0
    }

    this.doctorService.getDrs().then((docs: any) => {
      this.Doctors = docs
	  
	  //console.log("From view.component.ts, GetDoctors(), Line 82");
	  //console.log(this.Doctors);
	  
      if (this.Doctors.length >= 1) {
        this.loadDrDetails();
        this.progressMsg = "Found " + this.Doctors.length + " Accounts"
      }
      else {
        this.progressMsg = 'No Doctors in the Network....'
        this.loadComplete = true
        this.showProgressCard = false
      }
    })

  }
}
