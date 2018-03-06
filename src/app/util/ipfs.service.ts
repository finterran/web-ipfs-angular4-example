import {Injectable} from '@angular/core';
import IpfsApi from 'ipfs-api';
import {Subject} from 'rxjs/Rx';

declare let window: any;

@Injectable()
export class IPFSService {
  ipfs: IpfsApi;

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapIPFS();
    });
  }

  public bootstrapIPFS() {
    // Checking if IPFS has already been injected in the browser
    if (typeof window.ipfs !== 'undefined') {
      // IPFS API aready loaded
      console.log('IPFS API aready loaded');
    } else {
      // inject ipfs
      this.ipfs = new IpfsApi({host: '127.0.0.1', port: '5001', protocol: 'http'});
    }
  }
}