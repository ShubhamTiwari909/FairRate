import { nameObj } from "./fair-rate-data";//User name data will be stores in this object

const body = document.querySelector("body")
const userNameValue = document.querySelector("#user-name")//accessing the user name value to set it in the profile


body.addEventListener("click", (e) => {
    const target = e.target;
    const navigation = target.closest(".entry-next-button")//button to take the form to next page
    const sectionContainer = target.closest(".section-container")//current section container

    if (navigation === null) {
        return;
    }
    else {
        //if next sibling section is not found, do nothing
        if (sectionContainer.nextElementSibling === null) return;
        e.preventDefault();

      /* This is a function that is checking if the input field is empty or not. If it is empty, it
      will add a red border to the input field. If it is not empty, it will add a green border to
      the input field. */
        const inputField = sectionContainer.querySelectorAll(".name-field")
        inputField.forEach(input => {
            if (input.value.length <= 0) {
                input.classList.add("border-red-700")
                input.classList.remove("border-green-700")
            }
            else {
                input.classList.remove("border-red-700")
                input.classList.add("border-green-700")
            }
        })

        // Setting the first and last name property of name object with the input value
        nameObj["firstName"] = inputField[0].value
        nameObj["lastName"] = inputField[1].value

        // Setting the value of user name which is present in the profle section of the last page
        userNameValue.innerText = `${nameObj["firstName"]} ${nameObj["lastName"]}`


        // Checking if the first name and last name value is filled or not
        if (Object.values(nameObj).every(x => x.length > 0)) {
            // Set the current container display value of hidden and set the 
            // next sibling container display value to flex amking it visible 
            sectionContainer.classList.add("hidden")
            sectionContainer.nextElementSibling.classList.add("flex")
            sectionContainer.nextElementSibling.classList.remove("hidden")
        }
        else{
            alert("Please fill all the required fields")
        }
    }
})