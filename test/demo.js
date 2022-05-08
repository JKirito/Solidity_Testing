const Demo = artifacts.require('Demo');

contract('Demo Testing', () => {
  it('should set the value in the smart contract', async () => {
    const demo = await Demo.deployed();
    await demo.set('Hi There');
    const result = await demo.get();
    assert(result === 'Hi There');
  });
});
