import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  Titles: any = ['In Patients','Active Doctors']
  Images: any = ['procedures','user-md',]
  Count: number = 0
  Background: any = ['orange','blue',]

  accountBalance: any;

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.accountBalance = this.blockchainService.getBalance()
    console.log(this.accountBalance);

    let getBalance = setInterval(() => {
      this.accountBalance = this.blockchainService.getBalance()
      if(this.accountBalance != null){
        this.accountBalance /= 1000000000000000000
        console.log("Balance",this.accountBalance);
        clearInterval(getBalance);
      }
    },1000)
  }


  
  

}
