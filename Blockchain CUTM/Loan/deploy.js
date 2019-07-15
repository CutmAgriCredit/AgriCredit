const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'grace arrest road usage neglect alpha weather sphere recipe search hub brand',
  'https://rinkeby.infura.io/v3/2d0e91e935484b71ab01cf722452b930'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode,})
    .send({ from: accounts[0] });
  console.log(interface);  
  console.log('Contract deployed to', result.options.address);
};
deploy();
