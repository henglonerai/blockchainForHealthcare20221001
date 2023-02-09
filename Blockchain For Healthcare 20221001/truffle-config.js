Web3 = require('web3');

module.exports = {
 
  networks: {
    /*dev: {
      host: "*",
      port: 8545,
      network_id: "*", // Match any network id
		gasPrice: 0,
		gas: 4500000,
    },*/

	// From https://www.youtube.com/watch?v=boa5F5phZxo&ab_channel=Kaleido
	// Around 13:00 in the video
	development: {
		provider: () => {
			const appCred = 'k0kzrqf2l8:_qNgRzX4ZFTI-wTFI1PJgGPYSrLw5j0QUTfYLl8edww';
			const connectionURL = 'k0o9r454ac-k0z6j58rqs-rpc.kr0-aws.kaleido.io';
			return new Web3.providers.HttpProvider('https://' + appCred + '@' + connectionURL + '', 100000);
		},
		network_id: "*",
		gasPrice: 0,
		gas: 4500000,
	},
	/*development: {
		provider: () => {
			const appCred = 'user:password';
			const connectionURL = 'abc-abc-rpc.kr0-aws.kaleido.io';
			return new Web3.providers.HttpProvider('https://' + appCred + '@' + connectionURL + '', 100000);
		},
		network_id: "*",
		gasPrice: 0,
		gas: 4500000,
	},*/
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  },

};
