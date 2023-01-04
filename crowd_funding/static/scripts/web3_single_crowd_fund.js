/** imports */
import { get_web3_object, get_wallet, get_wallet_address, get_smart_contract } from './web3_activities.js';

/** DOM elements */
let crowd_fund_name = document.getElementById("crowd_fund_name").textContent;
let single_crowd_fund_container = document.querySelector(".single_crowd_section");

let amount_raised_element = document.getElementById("amount_raised");
let num_of_funders_element = document.getElementById("num_of_funders");


/** Functions */
async function get_single_crowd_fund(name) {
    let crowd_fund_info;

    // getting web3 instance
    let web3_obj = get_web3_object();

    //getting smart contract
    let contract = await get_smart_contract()

    try{
        crowd_fund_info = await contract.methods.getSingleCrowdFund(name).call();

        return crowd_fund_info;
    }
    catch(error) {
        // the user's wallet is not connected
        if (error.code == 4100) {
            get_wallet();
            get_single_crowd_fund(name);
        }
        else {window.alert("There Is No CrowdFund With That Name")};
    }
}


function assign_field_values(data) {
    amount_raised_element.textContent = data[2];
    num_of_funders_element.textContent = data[3];
}


async function crowd_fund_exists(name) {
    single_crowd_fund_container.style.display = "none";
    try{
        let crowd_fund_data = await get_single_crowd_fund(name);

        // if the data is returned then the single crowd fund container can be displayed
        if (crowd_fund_data) {
            single_crowd_fund_container.style.display = "block";
            assign_field_values(crowd_fund_data);
        }
    }
    catch(error) {
        console.log(error)
    }
}



//event listener
window.addEventListener("load", crowd_fund_exists(crowd_fund_name));