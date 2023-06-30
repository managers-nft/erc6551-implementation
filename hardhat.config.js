require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-contract-sizer");
require("dotenv").config();
const { removeConsoleLog } = require("hardhat-preprocessor");

const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.g.alchemy.com/v2/";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/";
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || "https://eth-goerli.g.alchemy.com/v2/";

const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
// optional
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
const ARBYSCAN_API_KEY = process.env.ARBYSCAN_API_KEY || "Your etherscan API key";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const REPORT_GAS = process.env.REPORT_GAS || false;

module.exports = {
    defaultNetwork: "hardhat",
    preprocess: {
        eachLine: removeConsoleLog((hre) => hre.network.name !== "hardhat" && hre.network.name !== "localhost"),
    },
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
            // mining: {
            //     auto: false,
            //     interval: 10,
            // },
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //accounts: {
            //     mnemonic: MNEMONIC,
            // },
            //   gasPrice: 48573939,
            saveDeployments: true,
            chainId: 5,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //accounts: {
            //     mnemonic: MNEMONIC,
            // },
            // gasPrice: 48573939,
            saveDeployments: true,
            chainId: 11155111,
        },
        polygon: {
            url: POLYGON_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 137,
            // gas: 21520590,
            // gasPrice: 176000000000,
            // maxPriorityFeePerGas : 38573939
        },
        arbitrumOne: {
            url: ARBITRUM_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 42161,
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 1,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            arbitrumOne: ARBYSCAN_API_KEY,
            mainnet: ETHERSCAN_API_KEY,
            polygon: POLYGONSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
        token: "ETH",
        gasPrice: 18,
        showMethodSig: true,
        //      outputFile: "gas-report.txt",
        //      noColors: true,
        coinmarketcap: process.env.CMC_KEY,
    },
    contractSizer: {
        runOnCompile: false,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.17",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
};
