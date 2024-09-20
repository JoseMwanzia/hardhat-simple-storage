// imports
const { ethers, run, network } = require('hardhat');
require('dotenv').config()

// async function main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    console.log('====================================');
    console.log("Deploying contract...");
    console.log('====================================');

    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    // no PRIVATE_KEY
    // no RPC_URL
    console.log(`----Deployed contract to----: ${await simpleStorage.getAddress()}`);

    /* What happens when we deploy to our hardhat network? 
    31337 -> Hardhat
    11155111 -> Sepolia */
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log('----Waiting for block transactions----')
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(await simpleStorage.getAddress(), [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`);

    // update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue} `);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
    
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(error );
            
        }
    }
}

// call main
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })