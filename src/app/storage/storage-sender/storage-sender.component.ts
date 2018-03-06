import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {IPFSService} from '../../util/ipfs.service';
import storage_artifacts from '../../../../build/contracts/SimpleStorage.json';

declare const Buffer;

@Component({
  selector: 'app-storage-sender',
  templateUrl: './storage-sender.component.html',
  styleUrls: ['./storage-sender.component.css']
})
export class StorageSenderComponent implements OnInit {
  accounts: string[];
  SimpleStorage: any;
  File: any;
  filePath: any = '';
  model = {
    storedHash: '',
    file_array: this.File,
    account: ''
  };

  ipfsStatus = '';

  status = '';

  constructor(private web3Service: Web3Service, private ipfsService: IPFSService) {
    console.log('Constructor: ' + web3Service + ' and ' + ipfsService);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(storage_artifacts)
      .then((StorageAbstraction) => {
        this.SimpleStorage = StorageAbstraction;
      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshStorage();
    });
  }

  setIPFSstatus(ipfs_status){
    this.ipfsStatus = ipfs_status;
  }

  setStatus(status) {
    this.status = status;
  }

  saveFile() {
    // check for IPFS connection object
    if(!this.ipfsService){
      this.setIPFSstatus('IPFS node unloaded or unreachable');
      return;
    }

    const buf = Buffer.from(this.model.file_array);
    this.ipfsService.ipfs.files.pin.add(buf, (err, result) => { // Upload file buffer to IPFS
      if(err) {
        console.error(err)
        return
      }
      this.model.storedHash = result[0].hash;
      const storedHash = result[0].hash;
      console.log('Changing storage hash to ' + storedHash);
      this.saveHash(storedHash);
    });
  }

  async saveHash(stored_file_hash) {
    if (!this.SimpleStorage) {
      this.setStatus('Storage Contract is not loaded, unable to store IPFS location hash');
      return;
    }

    this.setStatus('Initiating hash storage transaction... (please wait)');
    try {
      const deployedSimpleStorage = await this.SimpleStorage.deployed();
      const storedHash = this.model.storedHash;
      const transaction = await deployedSimpleStorage.set.sendTransaction(storedHash, {from: this.model.account});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
        this.refreshStorage();
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error setting Hash to conract; see log.');
    }
  }

  async refreshStorage() {
    console.log('Refreshing hash reference');

    try {
      const deployedSimpleStorage = await this.SimpleStorage.deployed();
      const storageHash = await deployedSimpleStorage.get.call();
      console.log('Current file hash ' + storageHash);
      this.model.storedHash= storageHash;
      this.filePath = "http://127.0.01:8080/ipfs/"+storageHash;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting storage data; see log.');
    }
  }

  clickAddress(e) {
    this.model.account = e.target.value;
    this.refreshStorage();
  }

  setFile(e) {
    console.log('Setting File: ' + e.target.value);
    let file = e.target.files[0];
    var reader = new FileReader();
    const that = this;
    reader.readAsArrayBuffer(file);
    reader.onloadend = function() {
      that.model.file_array = reader.result;
    }
  }



}
