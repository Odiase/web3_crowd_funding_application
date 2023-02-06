import { is_account_connected, get_wallet, show_wallet_info } from './web3_activities.js';

let connect_btns = document.querySelectorAll(".connect_wallet_btn");


// event listeners

if (connect_btns) {
    for (let i=0; i < connect_btns.length; i++) {
        connect_btns[i].addEventListener("click", async () => {
            if (await is_account_connected()) {
                window.location.replace(`${location.origin}/crowd_fund/create`);
            }
            else{
                get_wallet();
            }
        })
    }
}

window.addEventListener("load", async () =>{
    if (await is_account_connected()) {
        show_wallet_info(localStorage.getItem('account'));

        // hide the connect button in the header
        connect_btns[0].style.display = "none";
    }
    else{
        let account_element_container = document.querySelector(".account_info");

        // show the connect to wallet button which is in the header tag
        connect_btns[0].style.display = "block";

        // hiding the wallet info container
        account_element_container.style.display = "none";
    }
})