/** Function imports */
import { get_web3_object, get_wallet, get_wallet_address, get_smart_contract } from './web3_activities.js';

/** DOM elements */
let crowd_fund_name = document.getElementById("crowd_fund_name").textContent;
let single_crowd_fund_container = document.querySelector(".single_crowd_section");

let amount_raised_element = document.getElementById("amount_raised");
let num_of_funders_element = document.getElementById("num_of_funders");
let description_text = document.getElementById("description_text");


/** Functions */

// @params: name - this is the name of the crowd_fund
// @notice - the web3_obj gets the web3_object from the web3_activities js, so as to interact with the browser as a web3 browser
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
        // in the case of any other error
        //(which is most likely because there isn't a crowd fund that exists with the name tht was passed in as a parameter)
        else {window.alert("There Is No CrowdFund With That Name")};
    }
}


function assign_field_values(data) {
    let amount_raised = data[2] / 10**18;
    amount_raised_element.textContent = `${amount_raised} eth`;
    num_of_funders_element.textContent = data[3];
    description_text.textContent = data[4];
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


// function : fund_a_crowd_fund - this function handles sending funds or value from a user's account/wallet to the crowd_fund address
// @params : funder_name - this is the name of the individual sending funds to the crowd_fund
// @params : crowd_fund_name - this is the name of the crowd fund
async function fund_a_crowd_fund(funder_name, crowd_fund_name){
    // get web3 object
    let web3_obj = get_web3_object();

    // get smart contract
    let contract = get_smart_contract();

    // create transaction
    
}


//event listener
window.addEventListener("load", crowd_fund_exists(crowd_fund_name));