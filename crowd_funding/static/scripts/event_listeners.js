import { get_wallet } from './web3_activities.js';

let connect_btn = document.querySelector(".connect_wallet_btn");


// event listeners

connect_btn.addEventListener("click", () => {
    get_wallet();
})