const { time, expectRevert } = require('@openzeppelin/test-helpers');
const Loan = artifacts.require('Loan');

contract('Loan', (accounts) => {
  let instance = null;
  const amount = 1000;
  const interest = 10;
  const duration = 100;

  const [borrower, lender] = [accounts[1], accounts[2]];

  beforeEach(async () => {
    instance = await Loan.deployed();
  });

  it('should not accept lend if not lender', async () => {
    await expectRevert(
      instance.lend({ from: borrower, value: amount }),
      'only lender can lend'
    );
  });

  it('should not accept lend if amount is not exact', async () => {
    await expectRevert(
      instance.lend({ from: lender, value: 100 }),
      'can only lend the exact amount'
    );
  });

  it('should accept lend amount', async () => {
    const balance_before = await web3.eth.getBalance(borrower);
    await instance.lend({ from: lender, value: amount });
    const balance_after = await web3.eth.getBalance(borrower);

    const state = await instance.state();
    assert(state.toNumber() === 1);

    assert(
      web3.utils
        .toBN(balance_after)
        .sub(web3.utils.toBN(balance_before))
        .toNumber() === amount
    );
  });

  it('should not reimburse if not borrower', async () => {
    expectRevert(
      instance.reimburse({ from: lender, value: amount }),
      'only borrower can reimburse'
    );
  });

  it('should not reimburse if not exact amount', async () => {
    expectRevert(
      instance.reimburse({ from: borrower, value: amount }), // Sending only the amount -> not the interest with it causing revert
      'borrower need to reimburse exactly amount + interest'
    );
  });

  it('should not reimburse if loan has not matured', async () => {
    await expectRevert(
      instance.reimburse({ from: borrower, value: amount + interest }), // will fail due to time (end) as loan not matured
      'loan has not matured yet'
    );
  });

  it('should reimburse', async () => {
    time.increase(duration + 10);
    const before_balance = await web3.eth.getBalance(lender);
    await instance.reimburse({ from: borrower, value: amount + interest });
    const after_balance = await web3.eth.getBalance(lender);

    const state = await instance.state();
    assert(state.toNumber() === 2);
    assert(
      web3.utils
        .toBN(after_balance)
        .sub(web3.utils.toBN(before_balance))
        .toNumber() ===
        amount + interest
    );
  });
});
