const { network } = require("hardhat");
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");

    // Deployed address, currently all the same for all chains https://docs.tokenbound.org/contracts/deployments
    // This are V2 contracts, check the latest ones that are used here https://docs.tokenbound.org/contracts/deployments
    const arguments = ["0x02101dfB77FDE026414827Fdc604ddAF224F0921", "0x2d25602551487c3f3354dd80d76d54383a243358"];
    const nft = await deploy("ManagersTBA", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    });

    log("NFT address " + nft.address);

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(nft.address, arguments);
    }
};

module.exports.tags = ["all", "nft"];
