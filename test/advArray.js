const { expectRevert } = require('@openzeppelin/test-helpers');
// const AdvArray = artifacts.require('AdvArray');
const AdvArray = artifacts.require('ExposedContract');

contract('ExposedContract', () => {
  let instance = null;

  beforeEach(async () => {
    instance = await AdvArray.deployed();
  });

  it('checking insert', async () => {
    await instance.insert('Arpit');
    const res = await instance.users(0);
    assert(res['name'] === 'Arpit');
  });

  it('finding user success', async () => {
    const res = await instance._find(1);
    assert(res.toNumber() === 0);
  });

  it('finding users failed', async () => {
    expectRevert(instance._find(2), 'User does not exist!');
  });

  it('read testing', async () => {
    const res = await instance.read(1);
    assert(res['0'].toNumber() === 1);
    assert(res['1'] === 'Arpit');
  });

  it('updating check', async () => {
    await instance.update(1, 'jkirito');
    const res = await instance.users(0);
    assert(res['name'] === 'jkirito');
  });

  it('removing check', async () => {
    await instance.remove(1);
    expectRevert(instance._find(1), 'User does not exist!');
  });
});
