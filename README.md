<h1 align="center">    <a href="https://themanagers.wtf/">
      <img alt="pull requests welcome badge" src="https://themanagers.wtf/images/Logo.svg">
    </a></h1>



### The Managers - Hardhat implementation

This is the standard Hardhat implementation of ERC6551 used for deploying The Managers NFT project.

**What is implemented in this NFT?**

- ERC721A is used for base NFT to save on gas costs https://github.com/chiru-labs/ERC721A
- ERC2981 is used to set royalties  https://eips.ethereum.org/EIPS/eip-2981
- ERC4906 is used for setting metadata updates  https://eips.ethereum.org/EIPS/eip-4906
- DefaultOperatorFilterer which is used to "enforce" royalties https://github.com/ProjectOpenSea/operator-filter-registry
- ERC6551Registry and ERC6551AccountImplementation  both default registry interface and implementation contract https://eips.ethereum.org/EIPS/eip-6551

**Where is ERC6551 part?**

Key part is in **tokenBoundCreation** function that creates a NEW smart contract wallet and it is called when each ERC721A NFT is created

    function tokenBoundCreation(uint256 quantity, uint256 currentMinted) internal returns (bool) {
        for (uint256 i = 1; i <= quantity; i++) {
            ERC6551Registry.createAccount(
                ERC6551AccountImplementation,
                block.chainid,
                address(this),
                currentMinted + i,
                0,
                abi.encodeWithSignature("initialize()", msg.sender)
            );
        }

        return true;
    }

**How to deploy it?**

We are using Hardhat deploy plugin https://github.com/wighawag/hardhat-deploy so all this repo needs is for you to run
**npx hardhat deploy**
Don't forget to set .env variables

**Have trouble installing?**

Check here https://github.com/wighawag/hardhat-deploy#installation or just use npm install --force

**Smart contract details**

NFT contract is deployed here https://etherscan.io/address/0x8c34E6e60731D1Ff7E26c712EA1f798F90F29Ec6#code

Airdrop Starter Pack contract is deployed here https://etherscan.io/address/0xa67571f7a10c1e30eeefa42bcdd1a9548876584c#code
