const TransferAmount = artifacts.require('TransferAmount');

contract('Transfer Amount', (accounts) => {
  let instance = null;

  beforeEach(async () => {
    instance = await TransferAmount.deployed();
  });

  it('should transfer amount', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [100, 200, 300];

    const initialBalances = await Promise.all(
      recipients.map((reciepient) => {
        return web3.eth.getBalance(reciepient);
      })
    );

    // console.log(initialBalances);
    await instance.send(recipients, amounts, {
      from: accounts[0],
      value: 800,
    });

    const finalBalances = await Promise.all(
      recipients.map((recipient) => {
        return web3.eth.getBalance(recipient);
      })
    );
    // console.log(finalBalances);

    recipients.forEach((_item, index) => {
      const final = web3.utils.toBN(finalBalances[index]);
      const initial = web3.utils.toBN(initialBalances[index]);
      assert(final.sub(initial).toNumber() === amounts[index]);
    });
  });

  it('should transfer only if length of arrays are both same', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [100, 200];
    try {
      await instance.send(recipients, amounts, {
        from: accounts[0],
        value: 800,
      });
    } catch (err) {
      assert(err.message.includes('to must be same length as amount'));
      return;
    }
assert(false);
  });
});
