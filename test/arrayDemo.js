const ArrayDemo = artifacts.require('ArrayTest');

contract('Array Testing', () => {
  //   before(() => {
  //     console.log('Before All the test suite');
  //   });
  //   beforeEach(() => {
  //     console.log('I am before Each');
  //   });
  //   afterEach(() => {
  //     console.log('I am after Each');
  //   });
  //   after(() => {
  //     console.log('After All the test suite');
  //   });

  let instance = null;
  beforeEach(async () => {
    instance = await ArrayDemo.deployed();
  });

  afterEach(async () => {
    instance = null;
  });

  it('Should insert a number into the array', async () => {
    await instance.add(10);
    const result = await instance.get(0);
    // console.log('Result', result.toNumber());
    assert(result.toNumber() === 10);
  });

  it('should return element from the array', async () => {
    // const instance = await ArrayDemo.deployed();
    await instance.add(20); // 10 20 from  the above test
    const element = await instance.list(1);
    assert(element.toNumber() === 20);
  });

  it('should return the length of the array', async () => {
    // const instance = await ArrayDemo.deployed();
    const result = await instance.length();
    assert(result.toNumber() === 2);
  });

  it('should return all the elements in the array', async () => {
    const result = await instance.getAll();
    // console.log(result);
    const temo = result.map((el) => el.toNumber());
    assert.deepEqual(temo, [10, 20]);
  });
});
