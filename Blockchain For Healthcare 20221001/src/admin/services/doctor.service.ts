import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { IPFS } from 'src/environments/environment';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  web3: any;
  abi: any = {};
  netWorkData: any = {};
  netId: any;
  address: any;
  contract: any;
  account: any;

  ipfs: IPFSHTTPClient;

  msg_text: string = '';

  result: any;

  Doctors: any;

  DoctorDetails: string[] = [];

  drInfoload: boolean = false;

  constructor(
    private bs: BlockchainService,
    ipfsService: IpfsService,
    private http: HttpClient
  ) {

    this.contract = bs.getContract().then((c: any) => {
      return c
    })
    this.ipfs = ipfsService.getIPFS();
  }

  getDrs(): Promise<any> {
    return new Promise((resolve) => {
      this.bs.getContract().then((contract: any) => {
        this.Doctors = contract.methods.getAllDrs()
          .call()
          .then((docs: any) => {
            this.Doctors = docs;
            console.log(this.Doctors);
            resolve(this.Doctors)
          });
      })

    })
  }

  getDoctorDetails(docID: any): Promise<any> {
	 //console.log("From doctor.service.ts, Line 62");
    console.log(docID);

    return new Promise((resolve) => {
      this.bs.getContract().then((contract: any) => {
        contract.methods
          .getDr(docID)
          .call()
          .then((ipfsHash: string) => {
			  //console.log("From doctor.service.ts, Line 71");
            console.log(ipfsHash);
            //this.http.get(IPFS.localIPFSGet + ipfsHash)
			this.http.get(IPFS.localIPFSGet + ipfsHash, {
              headers: new HttpHeaders({
                Authorization: 'Basic ' + btoa( IPFS.userID + ':' + IPFS.key ),
              }),
            })
              .subscribe((data: any) => {
				  //console.log("From doctor.service.ts, Line 80");
                console.log(data);
                resolve(data);
              });
          });
      })
    })
  }

  addDoctor(docId: string, data: any): Promise<any> {
	  //console.log("From doctor.service.ts, addDoctor(), Line 90");
	  //console.log(docId);
	  //console.log("From doctor.service.ts, addDoctor(), Line 92");
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAcount().then(a => {
          this.addRecord(data).then(ipfsHash => {
			  //console.log("From doctor.service.ts, addDoctor(), Line 96");
			  //console.log(docId);
			  //console.log(ipfsHash);
			  //console.log("From doctor.service.ts, addDoctor(), Line 100");
            c.methods
              .addDrInfo(docId, ipfsHash)
              .send({ from: a })
              .on("confirmation", (result: any) => {
                console.log('result', result);
                if (result == 1) {
                  resolve(result);
                }
                reject(false)
              })
              .catch((err: any) => {
                reject(false)
              });
          })
        })
      })
    })
  }
  async addRecord(data: any) {
    let IPFShash = await (await (this.ipfs.add(Buffer.from(JSON.stringify(data))))).path
    return IPFShash
  }
}
