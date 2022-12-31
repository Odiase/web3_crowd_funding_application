let crowd_fund_form = document.getElementById("crowd_fund_form");
console.log(crowd_fund_form['owner_name'].value)




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
        let accountAddress = get_wallet_address();
        let create_fund_form = get_create_form_data();

        contract.methods.createCrowdFundContract(create_fund_form[0], create_fund_form[2], create_fund_form[1]).send({from: accountAddress})
        .then(functionResult => {
            // Use the function result
        2})
        .catch(error => {
            if (error.message.includes("User denied transaction signature")) {
                window.alert('You Rejected The Transaction')
            }else{
                window.alert("A Crowd Fund With That Name Already Exists.")
            }
        });
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

function get_create_form_data() {
    let name = crowd_fund_form['fund_name'].value;
    let owner_name = crowd_fund_form['owner_name'].value;
    let description = crowd_fund_form['description'].value;

    return [name, owner_name, description];
}

console.log(get_create_form_data())


// event listener
crowd_fund_form.addEventListener("submit", (e) => {
    e.preventDefault();
    create_crowd_fund();
})