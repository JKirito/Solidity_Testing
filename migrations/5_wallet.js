const Wallet = artifacts.require('Wallet');

module.exports = (deployer, _networks, accounts) => {
  deployer.deploy(Wallet, accounts[0]);
};
