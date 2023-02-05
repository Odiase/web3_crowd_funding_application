import { is_account_connected, get_wallet, show_wallet_info } from './web3_activities.js';

let connect_btn = document.querySelector(".connect_wallet_btn");


// event listeners

if (connect_btn) {
    connect_btn.addEventListener("click", () => {
        if (is_account_connected()) {
            window.location.replace(`${location.origin}/crowd_fund/create`);
        }
        else{
            get_wallet();
        }
    })
}

window.addEventListener("load", () =>{
    if (is_account_connected()) {
        console.log("User is connected")
        show_wallet_info(localStorage.getItem('account'));
    }
    else{
        let account_element_container = document.querySelector(".account_info");
        
        console.log("User is not connected")
        // hiding the wallet info container
        account_element_container.style.display = "none";
    }
})