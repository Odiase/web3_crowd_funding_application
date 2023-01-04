import { get_web3_object, get_wallet, get_wallet_address } from './web3_activities.js';
let crowd_fund_form = document.getElementById("crowd_fund_form");


// Functions

function get_form_data() {
    let name = crowd_fund_form['fund_name'].value;
    let owner_name = crowd_fund_form['owner_name'].value;
    let description = crowd_fund_form['description'].value;

    return [name, owner_name, description];
}




export async function create_crowd_fund()  {
    // getting smart contract
    contract = get_smart_contract();
    // create crowd fund
    let accountAddress = get_wallet_address();
    let create_fund_form = get_form_data();

    contract.methods.createCrowdFundContract(create_fund_form[0], create_fund_form[2], create_fund_form[1]).send({from: accountAddress})
        .then(functionResult => {
            console.log("DO")
            console.log(functionResult)
            // submitting the form to the backend to save necessary data
            crowd_fund_form.submit();
        2})
        .catch(async error => {
            // this runs if the user has rejected the transaction
            if (error.message.includes("User denied transaction signature") || error.code == 4001) {
                window.alert('You Rejected The Transaction')
            }
            // this runs if no wallet has been linked to the application
            else if (error.code == 4100) {
                await get_wallet('crowd_fund/create');
                create_crowd_fund();
            }
            else{
                window.alert("A Crowd Fund With That Name Already Exists.")
            }
        });
}

// event listener
crowd_fund_form.addEventListener("submit", (e) => {
    e.preventDefault();
    create_crowd_fund();
})