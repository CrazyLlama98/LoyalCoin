import Web3 from 'web3';
import {
  ETHEREUM_URL
} from '../constants';
import contract from 'truffle-contract';
import LoyalCoin from '../../../build/contracts/LoyalCoin.json';

var provider = new Web3.providers.HttpProvider(ETHEREUM_URL);
var web3 = new Web3(provider);

var LoyalCoinContract = contract(LoyalCoin);
LoyalCoinContract.setProvider(provider);

async function initCoinbase() {
  var instance = await LoyalCoinContract.deployed();
  var result = await instance.balanceOf(web3.eth.coinbase, { from: web3.eth.coinbase });

  console.log('CoinBase: ' + result);
  if (result == 0) {
    await instance.mint(web3.eth.coinbase, 500000000, { from: web3.eth.coinbase });
    result = await instance.balanceOf(web3.eth.coinbase, { from: web3.eth.coinbase });
  }
};

initCoinbase();

export default class TransactionService {
  async addGasToUser(publicKey, etherAmount) {
    web3.eth.sendTransaction({
      from: web3.eth.coinbase,
      to: publicKey,
      value: web3.toWei(etherAmount, "ether")
    });
  }

  async addAwarder(publicKey) {
    try {
      var instance = await LoyalCoinContract.deployed();

      await instance.addAwarder(publicKey, {
        from: web3.eth.accounts[0]
      });
    } catch (err) {
      throw err;
    }
  }

  async addAward(awardId, publicKey) {
    var instance = await LoyalCoinContract.deployed();

    var result = await instance.addAward(awardId, {
      from: publicKey
    });
    return result;
  }

  async deleteAwarder(publicKey) {
    var instance = await LoyalCoinContract.deployed();

    return await instance.deleteAwarder(publicKey, {
      from: web3.eth.accounts[0]
    });
  }

  async deleteAward(awardId, publicKey) {
    var instance = await LoyalCoinContract.deployed();

    return await instance.deleteAward(awardId, {
      from: publicKey
    });
  }

  async addCoinsToRetailer(publicKey) {
    var instance = await LoyalCoinContract.deployed();

    await instance.transfer(publicKey, 15000, { from: web3.eth.coinbase });
  }
}