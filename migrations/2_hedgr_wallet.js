const HedgrWalletFactory = artifacts.require("HedgrWalletFactory");

module.exports = async function(deployer, network, accounts) {
    if(network == 'kovan'){
        return deployer.deploy(HedgrWalletFactory).then(hedgr => console.log('hedgr factory address:', hedgr.address))
    }

}