// display buttons
var show_fundings_btn = document.querySelector(".show_other_fundings");
var hide_fundings_btn = document.querySelector(".hide_other_fundings");

// crowd_funding_container for mobile
var mobile_crowd_funding_container = document.querySelector(".crowd_fundings");

// delete form variables
var delete_btn = document.querySelector(".delete_btn");
var delete_form = document.querySelector(".delete_form");
var cancel_delete_btn = document.querySelector(".cancel-btn");


// event listeners and actions
show_fundings_btn.addEventListener("click", () => {
    mobile_crowd_funding_container.style.overflow = "visible";
    mobile_crowd_funding_container.style.height = "auto";
    show_fundings_btn.style.display = "none";
    hide_fundings_btn.style.display = "block";
})

hide_fundings_btn.addEventListener("click", () => {
    mobile_crowd_funding_container.style.overflow = "hidden";
    mobile_crowd_funding_container.style.height = "0";
    hide_fundings_btn.style.display = "none";
    show_fundings_btn.style.display = "block";
})


// delete form event listeners
cancel_delete_btn.addEventListener("click", () => {
    delete_form.style.top = "-100%";
})
delete_btn.addEventListener("click", () => {
    delete_form.style.top = "0";
})