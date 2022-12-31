function get_web3_object() {
    if(window.ethereum) {
        // assinging web3 object to global window web3 3 variable
        window.web3 = new Web3(ethereum);
        web3_obj = window.web3;
        return web3_obj;
    }else {
        window.alert("Note: You do not have MetaMask or any Web3 Extensions activated");
    }
}




async function get_wallet() {
    /** Checking if a metamask extension is available and trying to access it.....of course with the user's permission */
    web3_obj = get_web3_object();
    
    try {
        // trying to access the user web3 account on meta mask or any other web3 provider, if any
         var accounts = await web3_obj.eth.requestAccounts();
         // redirects the user to the home page.
         if (accounts) {
            localStorage.setItem('account', accounts[0])
            window.location.replace('http://127.0.0.1:8000/crowd_fund/create');
         }
         console.log(accounts)
    } catch (error) {
        if (error["message"] == "Already processing eth_requestAccounts. Please wait.") {
            window.alert("You seem to have denied access to a previous attempt to access your wallet, please clarify that.")
        }
    }
}







// function get_