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

export default class TransactionService {
  async addGasToUser(publicKey, etherAmount) {
    web3.eth.sendTransaction({
      from: web3.eth.coinbase,
      to: publicKey,
      value: web3.toWei(etherAmount, "ether")
    });
  }

  async addAwarder(publicKey) {
    var instance = await LoyalCoinContract.deployed();

    await instance.addAwarder(publicKey, { from: publicKey });
  }
}