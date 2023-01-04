export function get_web3_object() {
    if(window.ethereum) {
        // assinging web3 object to global window web3 3 variable
        window.web3 = new Web3(ethereum);
        let web3_obj = window.web3;
        return web3_obj;
    }else {
        window.alert("Note: You do not have MetaMask or any Web3 Extensions activated, this will make this application not to behave as expected.");
    }
}




export async function get_wallet(redirect_url) {
    /** Checking if a metamask extension is available and trying to access it.....of course with the user's permission */
    let web3_obj = get_web3_object();
    
    try {
        // trying to access the user web3 account on meta mask or any other web3 provider, if any
         var accounts = await web3_obj.eth.requestAccounts();
         // redirects the user to the home page.
         if (accounts) {
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
            window.alert("You seem to have denied access to a previous attempt to access your wallet, please clarify that.")
        }
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
    
        let contractAddress = "0xea1d2f4035302812495CA6dcf39C309E21422618"
        // Use the ABI to define the interface of the smart contract
        contract = await new web3_obj.eth.Contract(ABI.abi, contractAddress);
        return contract;
      } 
    catch (error) {
        window.alert("An Error Occured.");
    }
}
