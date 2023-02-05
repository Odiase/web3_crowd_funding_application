/**imports */
import { get_web3_object, get_wallet, get_wallet_address, get_smart_contract, gas_estimate } from './web3_activities.js';
import { start_loader, transaction_update } from './general.js';


/** DOM elements */
let crowd_fund_name = document.getElementById("crowd_fund_name").textContent;
let single_crowd_fund_container = document.querySelector(".single_crowd_section");

let amount_raised_element = document.getElementById("amount_raised");
let num_of_funders_element = document.getElementById("num_of_funders");
let description_text = document.getElementById("description_text");
let send_fund_form = document.getElementById("send_fund_form");

let withdraw_btn = document.getElementById("withdraw_fund_btn");


/** Functions */

// @params: name - this is the name of the crowd_fund
// @notice - the web3_obj variable gets its value from the web3_activities js, so as to interact with the browser as a web3 browser
async function get_single_crowd_fund(name) {
    let crowd_fund_info;

    // getting web3 instance
    // let web3_obj = get_web3_object();

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
        else {
            start_loader(" ")
            transaction_update("There Is No CrowdFund With That Name", "failed")
        };
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
// @params : funder_name - this holds the name of the individual sending funds to the crowd_fund
// @params : crowd_fund_name - this holds the name of the crowd fund
//@params : amount - This holds the amount of value that is to be sent to the crowd_fund (e.g 1 ETH, 0.5 ETH) 
async function fund_a_crowd_fund(funder_name, crowd_fund_name, amount){
    // get web3 object
    let web3_obj = get_web3_object();

    // get smart contract
    let contract = await get_smart_contract();

    // gas estimate
    const encodedData = contract.methods.fund(funder_name, crowd_fund_name).encodeABI();
    let estimated_gas = gas_estimate(encodedData)
    try{
        const sender_address = get_wallet_address();
        // startig loader animation
        start_loader("Transaction In Progress");
        const transaction = await contract.methods.fund(funder_name, crowd_fund_name).send({
            "from" : sender_address,
            "value" : web3_obj.utils.toWei(`${amount}`, 'ether'),
            "gas" : estimated_gas + 100,
            "gasPrice": estimated_gas
        },
        (error, transactionHash) => {
            if(error) {
              console.log(error);
            } else {
              console.log(transactionHash);
            }
          }
        )
        // display a success message to user
        start_loader("")
        transaction_update(`Transaction Successful! \n Amount of ${amount} ETH sent`, "successful")
    }
    catch(error) {
        if (error.code == 4001) {  
            start_loader("");
            transaction_update("You Rejected This Trasaction", "failed");
        }
        else if (error.code == 4100) {
           get_wallet(`crowd_fund/${crowd_fund_name}`);
        }
        console.log(error)
    }

}


async function withdraw_funds() {
    // user's address
    let user_address = get_wallet_address();

    // get smart contract
    let contract = await get_smart_contract();

    // making the transaction
    try{
        start_loader("Transaction In Progress")
        const tx = await contract.methods.withdrawBalance(crowd_fund_name).send({from : user_address});
        transaction_update("Funds Successfully Withdrawn!", "successful")
    }
    catch(error){
        if (error.message.includes("User denied transaction signature") || error.code == 4001) {
            start_loader("")
            transaction_update("You Rejected This Transaction", "failed")
        }
        else if (error.code == 4100) {
            console.log(error)
        }
        else{
            console.log(error);
        }
    }
}


//event listeners
window.addEventListener("load", crowd_fund_exists(crowd_fund_name));
send_fund_form.addEventListener("submit", (e) => {
    e.preventDefault();
    fund_a_crowd_fund(send_fund_form['sender_name'].value, crowd_fund_name, send_fund_form['amount'].value);
});

withdraw_btn.addEventListener("click", () => withdraw_funds());

