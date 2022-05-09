const { expectRevert } = require('@openzeppelin/test-helpers');
const Escrow = artifacts.require('Escrow');

contract('Escrow', (accounts) => {
  let instance = null;

  beforeEach(async () => {
    instance = await Escrow.deployed();
  });

  it('should reject deposit if called by any other than payer', async () => {
    await expectRevert(
      instance.deposit({ from: accounts[2], value: 10000 }),
      'Sender must be the payer'
    );
    // await instance.deposit({ from: accounts[2], value: 10000 });
  });
  it('should not send >= escrow amount', async () => {
    await expectRevert(
      instance.deposit({ from: accounts[1], value: 100000 }),
      'Cant send more than escrow amount'
    );
  });

  it('should not release funds before full amount is sent', async () => {
    await expectRevert(
      instance.release({ from: accounts[0] }),
      'cannot release funds before full amount is sent'
    );
    // await instance.deposit({ from: accounts[1], value: 10000 });
    // const balance = await instance.balanceOf();
    // console.log(Number(balance));
    // await instance.release({ from: accounts[0] });
    // 'cannot release funds before full amount is sent';
  });
  it('only the lawyer can release the funds', async () => {
    await instance.deposit({ from: accounts[1], value: 10000 });
    await expectRevert(
      instance.release({ from: accounts[1] }),
      'only lawyer can release funds'
    );
  });
  it('check fund transfer status', async () => {
    const before_balance = await web3.eth.getBalance(accounts[2]);
    await instance.release({ from: accounts[0] });
    const after_balance = await web3.eth.getBalance(accounts[2]);
    assert(
      web3.utils
        .toBN(after_balance)
        .sub(web3.utils.toBN(before_balance))
        .toNumber() === 10000
    );
  });
});
