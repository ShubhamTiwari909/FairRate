export const validationInputs = (container,dataObject) => {
    const errorMessage = container.querySelector("#input-empty-error")
    const emptyFields = []
    for (const key in dataObject) {
        if (dataObject[key].length <= 0) {
            emptyFields.push(key.toUpperCase())
        }
    }
    errorMessage.textContent = `Please fill ${emptyFields.join()} fields!!`
    errorMessage.classList.remove("hidden")
    setTimeout(() => {
        errorMessage.classList.add("hidden")
    }, 2000);
}