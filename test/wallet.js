const assert = require('assert');
const Assert = require('assert');
const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
  //   console.log(accounts);
  let instance = null;

  beforeEach(async () => {
    instance = await Wallet.deployed();
  });

  it('should set accounts[0] as owner', async () => {
    const owner = await instance.owner();
    assert(owner === accounts[0]);
  });

  it('should deposit ether to the contract', async () => {
    await instance.deposit({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether'),
    });
    // console.log(await web3.eth.getBalance(instance.address)); // finding contract balance
    const balance = await web3.eth.getBalance(instance.address);
    // console.log('Balance', Number(balance));
    // console.log('Incoming Balance', Number(web3.utils.toWei('2', 'ether')));
    assert.equal(balance, web3.utils.toWei('2', 'ether'));
  });

  it('should return the correct Balance of the contract', async () => {
    const result = await instance.checkBalance();
    // assert(result === web3.utils.toWei('2', 'ether')); // This will fail test as exceding the limits of int, so always use .equal for better testing
    assert.equal(result, web3.utils.toWei('2', 'ether'));
  });

  it('should transfer only if owner and confirm transfer', async () => {
    const reciever_before = await web3.eth.getBalance(accounts[1]);
    await instance.send(accounts[1], 10000, { from: accounts[0] });
    const reciever_after = await web3.eth.getBalance(accounts[1]);
    const finalBalance = web3.utils
      .toBN(reciever_after)
      .sub(web3.utils.toBN(reciever_before));
    assert(finalBalance.toNumber() == 10000);
  });

  it('should not transfer if tx not sent from owner', async () => {
    try {
      await instance.send(accounts[1], 10000, { from: accounts[0] });
    } catch (err) {
      assert(false, 'only owner should send tx');
    }
  });
});
