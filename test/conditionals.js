const Conditionals = artifacts.require('Conditionals');

contract('Testing Conditionals', () => {
  let instance;

  beforeEach(async () => {
    instance = await Conditionals.deployed();
  });

  it('Testing Check function', async () => {
    try {
      const result = await instance.check(5, 1);
      assert(result.toNumber() === 5);
    } catch (err) {
      assert(false, 'a should be greater than b');
    }
  });
});
