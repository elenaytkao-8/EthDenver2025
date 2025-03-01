// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC20, Ownable {
    uint256 public totalRetired;

    event CreditsRetired(address indexed user, uint256 amount);

    // Constructor now requires an initial owner, name, and symbol
    constructor(address initialOwner) ERC20("CarbonCredit", "CO2") Ownable(initialOwner) {}

    // Mint new carbon credits (only owner can do this)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Retire (burn) carbon credits
    function retire(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        totalRetired += amount;
        emit CreditsRetired(msg.sender, amount);
    }

    // Get total credits retired
    function getTotalRetired() public view returns (uint256) {
        return totalRetired;
    }
}
