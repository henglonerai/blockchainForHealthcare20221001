import {
  Component,
  OnInit
} from '@angular/core';
import { PatientService } from 'src/admin/services/patient.service';

@Component({
  selector: 'patient-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass'],
})
export class PatientViewComponent implements OnInit {
  model: any = {
    acID: '',
  };

  PatientIds: string[] = [];

  Patient: any = {
    patID: '',
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

  PatientDetails: any = [];

  loaded: boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn: boolean = false;
  progressMsg: string = ''


  constructor(private patientService: PatientService) {
    this.progressMsg = 'Loading Patient Accounts From Blockchain'
  }

  ngOnInit(): void {
    this.GetPatientIds()
  }

  loadPatientDetails() {
    console.log(this.PatientIds);
    this.PatientDetails = []
    for (var i = 0; i <= this.PatientIds.length; i++) {
      if (this.PatientIds[i])
        this.patientService.getPatientDetails(this.PatientIds[i]).then((data: any) => {
          this.PatientDetails.push(data)
        });
    }
    this.progressMsg = ''
    this.showProgressCard = false
  }

  GetPatientIds(): any {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = ''
    this.loadComplete = false

    if (this.PatientDetails.length >= 1) {
      this.showProgressCard = false
      return 0
    }

    this.patientService.getPatientIds().then((patientIds: any) => {
      this.PatientIds = patientIds
      if (this.PatientIds.length >= 1) {
        this.loadPatientDetails();
        this.progressMsg = "Found " + this.PatientIds.length + " Accounts"
      }
      else {
        this.progressMsg = 'No Patients in the Network....'
        this.loadComplete = true
        this.showProgressCard = false
      }
    })

  }
}
