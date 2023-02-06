import { is_account_connected, get_wallet, show_wallet_info } from './web3_activities.js';

window.addEventListener("load", async () => {
    if (await is_account_connected()) {
        window.location.replace(`${location.origin}/crowd_fund/create`);
    }
})