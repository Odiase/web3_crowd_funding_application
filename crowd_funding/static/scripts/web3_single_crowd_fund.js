import { get_web3_object, get_wallet, get_wallet_address, get_smart_contract } from './web3_activities.js';
let crowd_fund_name = document.getElementById("crowd_fund_name").textContent;

async function get_single_crowd_fund(name) {
    // getting web3 instance
    web3_obj = get_web3_object();

    //getting smart contract
    contract = get_smart_contract()

    try{
        crowd_fund_info = await contract.methods.getSingleCrowdFund.call(name);
        console.log(crowd_fund_info)
    }
    catch(error) {
        // the user's wallet is not connected
        if (error.code == 4100) {
            get_wallet();
            get_single_crowd_fund(name);
        }
        else{
            console.log(error)
        }
    }
}



//event listener
window.addEventListener("load", get_single_crowd_fund(crowd_fund_name));