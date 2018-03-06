# WEB-CLIENT-IPFS

This is an example Angular 4 single page application for storing documents to IPFS and their hashes in a smart contract. 

For simplicity, we will use MetaMask for wallet management and Ganache as a local test blockchain.

##Setup
###Chrome
MetaMask requires Chrome to work properly and does not handle Ganache restarts smoothly.

It is recommended to create a uniqe test user profile in Chrome for develoment. User profile creation can be found 
[here](how-to-create-and-manage-multiple-user-profiles-in-chrome.html) (Outdated but similar to current process)

*Warning: during Ganache restarts, the Metamask extension must be removed and reinstalled. 
This removes all wallet information (including real world wallets if you have any on the current profile). A test profile 
is highly suggested.*

###Install Metamask
Visit the MetaMask extension site [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) 
and install the MetaMask Chrome extension.

###Install Truffle
Easiest way to install truffle is to use npm package manager

```npm install -g truffle```

###Install Ganache
Ganache build instructions can be found [here](https://github.com/trufflesuite/ganache)

###Install IPFS
TODO: Dockerize IPFS with open CORS for API endpoints

IPFS build instructions can be found [here](https://github.com/ipfs/go-ipfs#install)

###Configure IPFS CORS for API

Locate your ipfs executable, it should be somewhere in "/usr/local/go/bin/go-ipfs"
and execute the following commands:

```ipfs init```

```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'```

```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST", "PUT", "OPTIONS"]'```

##Deployment
###Start Ganache
###Compile and Deploy Contract to Ganache
If you have used the npm command previously to install truffle, then truffle is global and you can run the following command from any directory in a terminal.

```truffle compile```

```truffle --network ganache migrate```

###Configure Metamask

Import test account using the private key 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'

*Note: there are other test accounts displayed in Ganache if needed*

Point MetaMask at Ganache under network selection with http://localhost:7545

###Start IPFS
In a terminal, under the directory of your ipfs executable

```ipfs daemon```

##Re-Deployment

Whenever Ganache is re-started the following must be done:

1) Re-deploy the Storage contract to Ganache

```truffle --network ganache migrate```

2) Remove the Metamask Chrome Extension and re-install and re-configure

Chrome extensions can be handled [here](chrome://extensions/)

MetaMask can be re-installed [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

For re-configuration see "Configure MetaMask" above.
