const LoyalCoin = artifacts.require("LoyalCoin");

module.exports = function (deployer) {
    deployer.deploy(LoyalCoin);
};