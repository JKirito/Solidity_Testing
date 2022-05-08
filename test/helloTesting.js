const HelloTesting = artifacts.require('HelloTesting');

contract('Hello Testing', () => {
  it('Should return Hello Testing', async () => {
    const tt = await HelloTesting.deployed();
    const result = await tt.print();
    assert(result === 'Hello World');
  });
});
