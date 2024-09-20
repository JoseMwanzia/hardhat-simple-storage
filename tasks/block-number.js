const { task } = require('hardhat/config');

task("block-number", "Prints the current block number", async (taskArg, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block Number: ${blockNumber}`);
})

module.exports = {}