// const AdvArray = artifacts.require('AdvArray');
const AdvArray = artifacts.require('ExposedContract');

module.exports = (deployer) => {
  deployer.deploy(AdvArray);
};
