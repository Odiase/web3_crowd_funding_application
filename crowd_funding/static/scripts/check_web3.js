// this file checks if a web3 extension(Mostly MetaMask) exists as an extension in the user's browser

async function check_and_connect() {
    /** Checking if a metamask extension is available and trying to access it.....of course with the user's permission */
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        console.log(window.web3);
        try {
            // trying to access the user web3 account on meta mask or any other web3 provider, if any
             var accounts = await window.web3.eth.requestAccounts();
             console.log(accounts)
        } catch (error) {
            console.error("User denied account access");
        }
    }
    else {
        window.alert("Note: You do not have any Web3 Extensions activated")
    }
}

check_and_connect();