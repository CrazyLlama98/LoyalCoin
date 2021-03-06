pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract LoyalCoin is ERC20Mintable, ERC20Burnable, Ownable {
    string public name = "LoyalCoin";
    string public symbol = "LoyC";
    uint256 public decimals = 0;
    mapping(address => bool) awarders;
    mapping(string => address) awards;

    event AwardGiven(address indexed _from, address indexed _to,  string indexed _type, uint _amount, uint _date);
    event AwardAdded(address _from, string _type);
    event AwardRemoved(address _from, string _type);
    event AwarderAdded(address _who);
    event AwarderRemoved(address _who);

    function giveAward(address user, string memory awardId, uint amount, uint date) public {
        if (awards[awardId] != msg.sender)
            revert("This award is not available");

        if (super.balanceOf(msg.sender) < amount)
            revert("Not enough awards");

        super.transfer(user, amount);

        emit AwardGiven(msg.sender, user, awardId, amount, date);
    }

    function isAwarder(address _addr) public view returns (bool) {
        return awarders[_addr];
    }


    function addAwarder(address _addr) public onlyOwner {
        awarders[_addr] = true;

        emit AwarderAdded(_addr);
    }

    function deleteAwarder(address _addr) public onlyOwner {
        awarders[_addr] = false;

        emit AwarderRemoved(_addr);
    }

    function addAward(string memory index) public returns (bool) {
        if (!isAwarder(msg.sender))
            revert("You are not an awarder");

        if (awards[index] == address(0x0)) {
            awards[index] = msg.sender;
            emit AwardAdded(msg.sender, index);

            return true;
        }

        return false;
    }

    function getAward(string memory index) public view returns (address) {
        return awards[index];
    }

    function deleteAward(string memory index) public {
        if (awards[index] != msg.sender)
            revert("This award is not available");

        awards[index] == address(0x0);
        emit AwardRemoved(msg.sender, index);
    }
}

