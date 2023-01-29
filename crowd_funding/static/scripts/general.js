let transaction_loader_container = document.querySelector(".transaction_loader");
let transaction_text = document.querySelector(".transaction_text");
let loader = document.querySelector(".loader");
let transaction_completed_icon = document.querySelector(".completed_icon");
let transaction_failed_icon = document.querySelector(".failed_icon");
let cancel_loader_btn = document.querySelector(".hide_loader");


export function transaction_update(message, status) {
    // Display the transaction status message to the user
    transaction_text.textContent = message;

    // checking the status message to know the right icon to display
    if (status == "successful") {
        // display successful icon
        loader.style.display = "none";
        transaction_failed_icon.style.display = "none";
        transaction_completed_icon.style.display = "block";
    }
    else if (status == "failed") {
        // display Failed icon
        loader.style.display = "none";
        transaction_completed_icon.style.display = "none";
        transaction_failed_icon.style.display = "block";
    }
}

export function start_loader(message) {
    // display the loader container
    transaction_loader_container.style.opacity = "1";
    transaction_loader_container.style.zIndex = "9999999999";
    transaction_text.textContent = message
    loader.style.display = "block";
    transaction_completed_icon.style.display = "none";
    transaction_failed_icon.style.display = "none";
}

export function close_loader() {
    transaction_loader_container.style.opacity = "0";
    transaction_loader_container.style.zIndex = "-99999999999";
    loader.style.display = "block";
}

cancel_loader_btn.addEventListener("click", () => {close_loader()});

// transaction_completed("This Transaction Failed", "failed")