const { expectRevert } = require('@openzeppelin/test-helpers');
const Array = artifacts.require('Array');

contract('Struct Array Test', () => {
  let instance = null;
  beforeEach(async () => {
    instance = await Array.deployed();
  });
  it.only('inserting element', async () => {
    await instance.insert('Arpit');
    const students = await instance.students(0);
    assert(students.name === 'Arpit');
  });

  it.only('find user success', async () => {
    const result = await instance.find(1);
    const resp = await instance.students(result.toNumber());
    assert(resp.name === 'Arpit');
  });
  it.only('find user failing', async () => {
    await expectRevert(instance.find(10), 'User does not exist!');
  });

  it.only('reading student data', async () => {
    const resp = await instance.read(1);
    assert(resp[0].toNumber() === 1);
    assert(resp[1] === 'Arpit');
  });
});
