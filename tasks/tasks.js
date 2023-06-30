const { task } = require("hardhat/config");
//const fetch = require("node-fetch");

task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs, hre) => {
        const balance = await hre.ethers.provider.getBalance(taskArgs.account);

        console.log(hre.ethers.utils.formatEther(balance), "ETH");
    });

task("mint", "Mints from the NFT contract")
    .addParam("quantity", "Quantity of tokens")
    .setAction(async function (taskArguments, hre) {
        const contract = await hre.ethers.getContract("ManagersTBA");
        //  const contractConnected = contract.connect(taskArguments.address);
        const transactionResponse = await contract.mint(taskArguments.quantity, {
            gasLimit: 500_000,
        });
        // console.log(`Contract Hash: ${contract.address}`);
        console.log(`Transaction Hash: ${transactionResponse.hash}`);
    });

task("set-base", "Sets the base token URI for the deployed smart contract")
    .addParam("base", "The base of the tokenURI endpoint to set")
    .setAction(async function (taskArguments, hre) {
        const contract = await hre.ethers.getContract("ManagersTBA");
        const transactionResponse = await contract.setBaseMetadataUri(taskArguments.base, {
            gasLimit: 500_000,
        });
        console.log(`Transaction Hash: ${transactionResponse.hash}`);
    });

task("tokenuri", "Fetches the token metadata for the given token ID")
    .addParam("id", "The tokenID to fetch metadata for")
    .setAction(async function (taskArguments, hre) {
        const contract = await hre.ethers.getContract("ManagersTBA");
        const response = await contract.tokenURI(taskArguments.id, {
            gasLimit: 500_000,
        });

        const metadata_url = response;
        console.log(`Metadata URL: ${metadata_url}`);
    });
