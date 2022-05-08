const Loan = artifacts.require('Loan');

module.exports = (deployer, _networks, accounts) => {
  deployer.deploy(Loan, 1000, 10, 100, accounts[1], accounts[2]);
};
