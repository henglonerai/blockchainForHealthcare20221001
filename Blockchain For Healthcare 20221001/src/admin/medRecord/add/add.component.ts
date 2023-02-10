import { Component, OnInit } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { MedRecordService } from 'src/admin/services/medRecord.service';


@Component({
  selector: 'medRecord-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class MedRecordAddComponent implements OnInit {
  model: any = {
    medRecordID: '',
    fName: 'test_name',
    lName: 'test_name',
    Doj: '',
    emailID: 'test_name@mail.com',
    phone: '123456789',
    city: 'city',
    state: 'state',
    speciality: 'speciality',
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
    private mr: MedRecordService
  ) {
    this.ipfs = mr.ipfs
  }

  ngOnInit(): void {
    this.ipfs = this.mr.ipfs
  }

  onAddMedRecordSubmit() {
    this.show = true;
    this.msg_text = 'Adding Medical Record to the Network....';
    this.warn = false;

    this.model.imageHash = this.image_url;

    let data = this.model;

    this.mr.addMedRecord(this.model.medRecordID, data).then((r: any) => {
      this.success = true
      this.msg_text = 'Data added to IPFS...';
      this.msg_text += '<br>User Added to the Blockchain';
      console.log('User added Successfully');

      this.model = {}

    }).catch((er: any) => {
      this.warn = true
      this.msg_text =
        'Adding Medical Record Failed<br> <small class="fw-light text-danger"><b>"</b>' +
        this.model.medRecordID +
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
