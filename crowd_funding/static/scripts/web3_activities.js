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


function create_crowd_fund() {
    web3_obj = get_web3_object();
    let contract;

    // Retrieve the ABI from the crowd_fund_factory_abi.json file
    fetch('http://127.0.0.1:8000/static/scripts/crowd_fund_factory_abi.json')
    .then(response => response.json())
    .then(ABI => {
        contractAddress = "0xea1d2f4035302812495CA6dcf39C309E21422618"
        // Use the ABI to define the interface of the smart contract
        contract = new web3_obj.eth.Contract(ABI.abi, contractAddress);
        console.log(contract);


        // create crowd fund
        accountAddress = get_wallet_address()
        contract.methods.createCrowdFundContract("UkrRusJs", "Desc", "Efosa").send({from: accountAddress})
        .then(functionResult => {
            // Use the function result
        2})
        .catch(error => {console.log(error)});
    });


}

function get_wallet_address(){
    if (localStorage.getItem('account')) {
        return localStorage.getItem('account');
    }
    else{
        window.location.replace("http://127.0.0.1:8000/connect_wallet");
    }
}

// function is_connected() {
//     web3_obj = get_web3_object();
//     web3_obj.eth.requestAccounts()
//     .then(
//         function(accounts){
//             if (accounts.length > 0) {
//                 window.location.assign('http://127.0.0.1:8000/sign_out');
//             }
//             else{console.log("Connect Wallet.")
//                 window.location.assign('http://127.0.0.1:8000/connect_wallet');
//             }
//         }
//     )
// }





// function has_web3_extension() {
    /** this function checks if a wallet is connected to the application */
    // web3.eth.net.isListening()
    // .then(
    //     function(isListening){
    //         if (isListening) {
    //             console.log("Yeah You Are Connected Alright.");
    //             return true;
    //         }
    //         else{
    //             console.log("Not connected to Ethereum node. Please check your connection and try again.");
    //         }
    //     }
    // )
    // .catch(
    //     function(error){
    //         console.log(error);
    //     }
    // )
// }



// get_wallet();
// has_web3_extension()