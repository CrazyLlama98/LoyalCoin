import { ETHEREUM_NETWORK_URL } from '../utils/constants';
import Web3 from 'web3';
import contract from 'truffle-contract';
import LoyalCoin from '../../../build/contracts/LoyalCoin.json';

var provider = new Web3.providers.HttpProvider(ETHEREUM_NETWORK_URL);
//var web3 = new Web3(provider);

var LoyalCoinContract = contract(LoyalCoin);
LoyalCoinContract.setProvider(provider);


export default class TransactionService {
  async getBalance(publicKey) {
    var instance = await LoyalCoinContract.deployed();
    return await instance.balanceOf(publicKey, { from: publicKey });
  }

  async sendAward(userKey, retailerKey, amount, awardId, date) {
    var instance = await LoyalCoinContract.deployed();
    return await instance.giveAward(userKey, awardId, amount, date, { from: retailerKey });
  }

  async transfer(fromKey, toKey, amount) {
    var instance = await LoyalCoinContract.deployed();
    return await instance.transfer(toKey, amount, { from: fromKey });
  }
}