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
export class MedRecordService {
  web3: any;
  contract: any;
  account: any;

  ipfs: IPFSHTTPClient;

  MedRecordIds: string[] = [];

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

  getMedRecordIds(): Promise<any> {
    return new Promise((resolve) => {
      this.contract.then((contract: any) => {
        this.MedRecordIds = contract.methods.getAllMedRecordIds()
          .call()
          .then((medRecordIds: any) => {
            this.MedRecordIds = medRecordIds;
            console.log(this.MedRecordIds);
            resolve(this.MedRecordIds)
          });
      })

    })
  }

  getMedRecordDetails(medRecordId: any): Promise<any> {
    console.log(medRecordId);

    return new Promise((resolve) => {
      this.contract.then((contract: any) => {
        contract.methods
          .getMedRecord(medRecordId)
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

  /*addMedRecord(pat_id: any, data: any) {
    console.log("adding MedRecord");
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
  addMedRecord(pat_id: any, data: any) {
    return new Promise((resolve, reject) => {
      this.blockchainService.getContract().then(contract => {
        this.blockchainService.getCurrentAcount().then(a => {
          this.addRecord(data).then(ipfsHash => {
            contract.methods
              .addMedRecordInfo(pat_id, ipfsHash)
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
