// imports
import { start_loader, transaction_update } from "./general.js";


// global variables
export let contract_address = "0x258F1FBFdAC4F290f792426C17dBEf4A0B8c90B5";

export function get_web3_object() {
    if(window.ethereum) {
        // assinging web3 object to global window.web3 variable
        window.web3 = new Web3(ethereum);
        let web3_obj = window.web3;
        return web3_obj;
    }else {
        start_loader("");
        transaction_update("Note: You do not have MetaMask or any Web3 Extensions activated, this will make this application not to behave as expected.", "failed");
    }
}


export async function get_wallet(redirect_url) {
    /** Checking if a metamask extension is available and trying to access it.....of course with the user's permission */
    let web3_obj = get_web3_object();
    
    try {
        // starting loader animation
        start_loader("Requesting Permission To Connect To Wallet, Complete the connection in the Metamask Pop-up")
         var accounts = await web3_obj.eth.requestAccounts();

         // redirects the user to the home page.
         if (accounts) {
            // showing a success message to the user and update wallet balance
            transaction_update(`${accounts} Connected Successfully`)
            show_wallet_info(accounts[0]);

            // saving the account in local storage
            localStorage.setItem('account', accounts[0]);

            // redirection
            let current_url = window.location.href;
            let url_to_redirect = `${location.origin}/${redirect_url}`;

            if (current_url == url_to_redirect) {}
            else if(redirect_url == undefined) {
                window.location.replace(`${location.origin}/crowd_fund/create`);
            }
            else{  
                window.location.replace(url_to_redirect);
            }
         }
    } catch (error) {
        if (error["message"] == "Already processing eth_requestAccounts. Please wait.") {
            start_loader("")
            transaction_update("You seem to have denied access to a previous attempt to access your wallet, please clarify that.", "failed")
        }
        else{
            start_loader("")
            transaction_update("An Error Occured.", "failed")
        }
    }
}

export async function is_account_connected() {
    /** Checks if a user account is connected to the application */

    let web3_obj = get_web3_object();
    
    // getting connected accounts if any
    let accounts = await web3_obj.eth.getAccounts()
    localStorage.setItem('account', accounts[0])
    if(accounts.length > 0) {
        return true;
    }
    else{
        // removing stored account in local storage to get rid of errors
        localStorage.removeItem('account')
        return false
    }
}


export function get_wallet_address(redirect_url){
    /** Gets the user's wallet address and if its not available, it redirects them to the 'connect wallet' page */
    if (localStorage.getItem('account')) {
        return localStorage.getItem('account');
    }
    else{
        window.location.assign("http://127.0.0.1:8000/connect_wallet");
    }
}



export async function get_smart_contract(){
    let web3_obj = get_web3_object();
    let domain = location.origin;
    let contract;

    try {
        // Retrieve the ABI from the crowd_fund_factory_abi.json file
        const response = await fetch(`${domain}/static/scripts/crowd_fund_factory_abi.json`);
        const ABI = await response.json();
    
        let contractAddress = contract_address
        // Use the ABI to define the interface of the smart contract
        contract = await new web3_obj.eth.Contract(ABI.abi, contractAddress);
        return contract;
      } 
    catch (error) {
        start_loader("");
        transaction_update("An Error Occured.", "failed")
    }
}

export function gas_estimate(encoded_data) {
    // Getting Estimated Gas Fee
    let gas_estimate;
    let web3_obj = get_web3_object();

    web3_obj.eth.estimateGas({to: contract_address, data: encoded_data}, (error, estimate) => {
        if(!error) {
            gas_estimate = estimate;
        } else {
        }
    });

    return gas_estimate
}

export async function show_wallet_info(account) {
    let web3_obj = get_web3_object();
    let balance;

    // DOM ELEMENTS
    let balance_element = document.querySelector(".eth_balance");
    let wallet_element = document.querySelectorAll(".wallet_address");

    let eth_balance = web3_obj.eth.getBalance(account, function(error, result) {
        if (error) {
            start_loader("")
            transaction_update("An Error Occured While Trying To Get Your Wallet Balance");
        } else {
            // update balance field
            let converted_eth = web3.utils.fromWei(result, "ether");
            // changng to integer, so i can get the 2 digits after the dp
            converted_eth = Math.floor(converted_eth * 100) / 100;

            balance_element.textContent = converted_eth + " ETH";
            let account_length = account.length;

            for(let i=0; i < wallet_element.length; i++) {
                wallet_element[i].textContent = `${account[0]}${account[1]}${account[2]}${account[3]}${account[4]}${account[5]}....${account[account_length-4]}${account[account_length-3]}${account[account_length-2]}${account[account_length-1]}`
            }
        }
    })
}
