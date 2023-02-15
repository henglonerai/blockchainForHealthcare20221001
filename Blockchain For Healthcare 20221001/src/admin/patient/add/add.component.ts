import { Component, OnInit } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { PatientService } from 'src/admin/services/patient.service';


@Component({
  selector: 'patient-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class PatientAddComponent implements OnInit {
  model: any = {
    patID: '',
    fName: 'first_name',
    lName: 'last_name',
    Doj: '',
    emailID: 'test_name@gmail.com',
    phone: '0107674088',
    city: 'Eg: Butterworth',
    state: 'Eg: Penang',
    speciality: 'Eg: Cardiologist',
    imageHash: '',
  };

  image_url: any;
  imageCompressedUrl: string = '';

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success: boolean = false

  ipfs: IPFSHTTPClient;

  IPFShash: string = ''

  constructor(
    private ps: PatientService
  ) {
    this.ipfs = ps.ipfs
  }

  ngOnInit(): void {
    this.ipfs = this.ps.ipfs
  }

  onAddPatientSubmit() {
    this.show = true;
    this.msg_text = 'Adding Patient to the Network....';
    this.warn = false;

    this.model.imageHash = this.image_url;

    let data = this.model;

    this.ps.addPatient(this.model.patID, data).then((r: any) => {
      this.success = true
      this.msg_text = 'Data added to IPFS...';
      this.msg_text += '<br>User Added to the Blockchain';
      console.log('User added Successfully');

      this.model = {}

    }).catch((er: any) => {
      this.warn = true
      this.msg_text =
        'Adding Patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
        this.model.patID +
        '<b>"</b></small><br>1.not a valid address or <br>2.Already have a role';
      console.log(er);
    })
  }


  PreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image_url = event.target.result;
        // this.compressImage();
        console.log(this.image_url);

      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onClose() {
    this.show = false;
    this.warn = false;
  }
}
