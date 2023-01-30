import { is_account_connected } from './web3_activities.js';

let connect_btn = document.querySelector(".connect_wallet_btn");


// event listeners

connect_btn.addEventListener("click", () => {
    is_account_connected();
})