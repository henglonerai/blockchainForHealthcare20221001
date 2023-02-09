import { Injectable } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS } from 'src/environments/environment';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  web3: any;
  contract: any;
  account: any;

  ipfs: IPFSHTTPClient;

  PatientIds: string[] = [];

  addprogress:boolean = false;
  added:boolean = false
  failed:boolean = false

  constructor(
    private blockchainService: BlockchainService,
    private ipfsService: IpfsService,
    private http: HttpClient
  ) {
    this.web3 = blockchainService.getWeb3();

    this.contract = blockchainService.getContract();
    
    this.getAcccount();

    this.ipfs = ipfsService.getIPFS();
  }

  getPatientIds(): Promise<any> {
    return new Promise((resolve) => {
      this.contract.then((contract: any) => {
        this.PatientIds = contract.methods.getAllPatientIds()
          .call()
          .then((patientIds: any) => {
            this.PatientIds = patientIds;
            console.log(this.PatientIds);
            resolve(this.PatientIds)
          });
      })

    })
  }

  getPatientDetails(patientId: any): Promise<any> {
    console.log(patientId);

    return new Promise((resolve) => {
      this.contract.then((contract: any) => {
        contract.methods
          .getPatient(patientId)
          .call()
          .then((ipfsHash: string) => {
            console.log(ipfsHash);
            //this.http.get(IPFS.localIPFSGet + ipfsHash)
			this.http.get(IPFS.localIPFSGet + ipfsHash, {
              headers: new HttpHeaders({
                Authorization: 'Basic ' + btoa( IPFS.userID + ':' + IPFS.key ),
              }),
            })
              .subscribe((data: any) => {
                console.log(data);
                resolve(data);
              });
          });
      })
    })
  }

  /*addPatient(pat_id: any, data: any) {
    console.log("adding Patient");
    this.contract = this.blockchainService.getContract()

    //this.ipfs.addJSON(data).then((IPFSHash: any) => {
	this.ipfs.add(Buffer.from(JSON.stringify(data))).then((IPFSHash: any) => {
      console.log("IPFS hash : ",IPFSHash);
      this.contract.methods
        .addPatInfo(pat_id, IPFSHash)
        .send({ from: this.account })
        .on("confirmation",(result: any) => {
          console.log("result",result);
          if(result){
            this.addprogress = true
            this.added = true
          }
        })
        .catch((err: any) => {
          console.log("error",err);
          this.addprogress = true
          this.added = false
          this.failed = true
        });
    });
  }*/

  //addDoctor(docId: string, data: any): Promise<any> {
  addPatient(pat_id: any, data: any) {
    return new Promise((resolve, reject) => {
      this.blockchainService.getContract().then(contract => {
        this.blockchainService.getCurrentAcount().then(a => {
          this.addRecord(data).then(ipfsHash => {
            contract.methods
              .addPatientInfo(pat_id, ipfsHash)
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

  getAcccount() {
    console.log('geting Account...');
    let getacc = setInterval(() => {
      this.account = this.blockchainService.getAccount();
      if (this.account != null) {
        clearInterval(getacc);
        return this.account;
      }
    }, 1000);
  }
}
