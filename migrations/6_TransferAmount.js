const TransferAmount = artifacts.require('TransferAmount');

module.exports = (deployer, _networks, accounts) => {
  deployer.deploy(TransferAmount, accounts[0]);
};
