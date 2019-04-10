import Web3 from 'web3'

const getWeb3 = () => new Promise((resolve, reject) => {
    // Check for injected web3 (mist/metamask)
    var web3js = window.web3;
    if (typeof web3js !== 'undefined') {
      var web3 = new Web3(web3js.currentProvider);
      resolve(web3);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      if (typeof web3 !== undefined) {
        resolve(web3);
      } else {
        reject(new Error('Unable to connect to Network'));
      }
    }
  })

export default {
  getWeb3
};