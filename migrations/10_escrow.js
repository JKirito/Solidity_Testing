const Escrow = artifacts.require('Escrow');

module.exports = (deployer, _networks, accounts) => {
  deployer.deploy(Escrow, accounts[1], accounts[2], 10000);
};
