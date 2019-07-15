const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let loan;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  loan = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Loan Contract', () => {
  it('deploys a contract', () => {
    assert.ok(loan.options.address);
  });
  it('allows one account to sign up', async () => {
    await loan.methods.signUp().send({
      from: accounts[0]
});
const user_db = await loan.methods.getUserDatabase().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], user_db[0]);
    assert.equal(1, user_db.length);
});
it('allows multiple accounts to sign up', async () => {
    await loan.methods.signUp().send({
      from: accounts[0]
    });
    await loan.methods.signUp().send({
      from: accounts[1]
    });
    await loan.methods.signUp().send({
      from: accounts[2]
    });

    const user_db = await loan.methods.getUserDatabase().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], user_db[0]);
    assert.equal(accounts[1], user_db[1]);
    assert.equal(accounts[2], user_db[2]);
    assert.equal(3, user_db.length);
  });
//   it('allows one target address to be entered', async () => {
//     await loan.methods.setAddress(accounts[1]).send({
//       from: accounts[1]
// });
// });
it('lends money', async () => {
  const initialBalance = await web3.eth.getBalance(accounts[0]);
  console.log(initialBalance);
  await loan.methods.Lend(accounts[1]).send({
    from: accounts[0],
    value: web3.utils.toWei('2', 'ether')
  });
  const finalBalance = await web3.eth.getBalance(accounts[0]);
  console.log(finalBalance);
  const difference = initialBalance-finalBalance;
  console.log(difference);
  assert(difference>web3.utils.toWei('1.8', 'ether'));
});
it('borrows money', async () => {
  const initialBalance = await web3.eth.getBalance(accounts[0]);
  console.log(initialBalance);
  await loan.methods.Borrow(accounts[0]).send({
    from: accounts[1],
    value: web3.utils.toWei('2', 'ether')
  });
  const finalBalance = await web3.eth.getBalance(accounts[0]);
  console.log(finalBalance);
  const difference = finalBalance-initialBalance;
  console.log(difference);
  assert(difference>web3.utils.toWei('1.8', 'ether'));
});

});
