// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./InvestmentToken.sol";
import "./Treasury.sol";

contract Governance {
    InvestmentToken public token;
    Treasury public treasury;

    constructor() {
        token = new InvestmentToken(1000 * 10 ** 18);
    }

    function setTreasury(address _treasury) external {
        treasury = Treasury(_treasury);
    }
}
