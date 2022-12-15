import { prevButtonNavigation, nextButtonNavigation } from './navigations'
import {documentFileObj} from './fair-rate-data'
import { validationInputs} from './validations'


//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector(".drag-text"),
    button = dropArea.querySelector(".file-input-button"),
    input = dropArea.querySelector(".file-input");

let documentImages = document.querySelector("#document-images")

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function (e) {
    const target = e.target
    setttingFileValue(target)
});



// Finding the document closest to the delete button and removing it from the list
documentImages.addEventListener("click", (e) => {
    const target = e.target;
    const deleteFileButton = target.closest(".delete-document")
    const documentsWrapper = target.closest("#document-images")
    const documentToDelete = target.closest(".document-file")
    const documentName = documentToDelete.firstElementChild.children[1].innerText

    if (deleteFileButton === null) return;

   /* This is finding the index of the file name in the documentFileObj object. */
    const index = documentFileObj["fileName"].find(x => x === documentName)
    /* This is removing the file name from the documentFileObj object. */
    documentFileObj["fileName"].splice(index, 1)
    documentsWrapper.removeChild(documentToDelete);
})

/**
 * If the file type is jpg, jpeg, or png, return the text-violet-600 fa-image class. Otherwise, return
 * the text-red-600 fa-file-pdf class.
 * @param fileType - The file type of the file.
 * @returns A function that takes a fileType as an argument and returns a string.
 */
const fileTypeLogo = (fileType) => {
    if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
        return "text-violet-600 fa-image"
    }
    else {
        return "text-red-600 fa-file-pdf"
    }
}


// //If user Drag File Over DropArea
/* This is an event listener. It is listening for the dragover event. When the dragover event is
triggered, it will prevent the default behavior, add the active class to the dropArea element, and
change the text of the dragText element. */
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// //If user leave dragged File from DropArea
/* This is an event listener. It is listening for the dragleave event. When the dragleave event is
triggered, it will remove the active class from the dropArea element and change the text of the
dragText
element. */
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag files here to upload";
});

//If user drop File on DropArea
/* This is an event listener. It is listening for the drop event. When the drop event is triggered, it
will prevent the default behavior, remove the active class from the dropArea element, change the
text of the dragText element, and call the setttingFileValue function. */
dropArea.addEventListener("drop", (e) => {
    e.preventDefault(); 
    const target = e.dataTransfer
    dropArea.classList.remove("active");
    dragText.textContent = "Drag files here to upload";
    setttingFileValue(target)
});





// Navigation part
/* This is an event listener. It is listening for the click event. When the click event is triggered,
it will check if the target is the nextButton or prevButton. If it is the nextButton, it will check
if the documentFileObj object has a fileName property. If it does, it will call the
nextButtonNavigation function. If it does not, it will show an alert. If the target is the
prevButton, it will call the prevButtonNavigation function. */
document.querySelector("body").addEventListener("click", (e) => {
    const target = e.target;
    const prevButton = target.closest(".document-prev-button")
    const nextButton = target.closest(".document-next-button")
    const sectionContainer = target.closest(".section-container")


    if (nextButton) {
        if (documentFileObj["fileName"].length !== 0) {
            nextButtonNavigation(sectionContainer)
        }
        else {
           validationInputs(sectionContainer,documentFileObj)
        }
    }

    if (prevButton) {
        prevButtonNavigation(sectionContainer)
    }

})




const setttingFileValue = (target) => {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    const fileSize = target.files[0].size
    let filesizeErrorMessage = document.getElementById("filesize-error")
    let filetypeErrorMessage = document.getElementById("filetype-error")

   /* This is checking the file size. If the file size is greater than 5mb, it will show an error
   message. */
    if (Number.parseFloat(fileSize / (1024 * 1024)).toFixed(2) > 5) {
        filesizeErrorMessage.classList.remove("hidden")
        filetypeErrorMessage.classList.add("hidden")
    }
    else {
        filesizeErrorMessage.classList.add("hidden")
       /* This is checking the file type. If the file type is not pdf or image, it will show an error
       message. */
        if (target.files[0].type === "application/pdf" || target.files[0].type === "image/png" || target.files[0].type === "image/jpg"
            || target.files[0].type === "image/jpeg") {
            filetypeErrorMessage.classList.add("hidden")

            /* This is creating a new element and setting the file name, file size, and file type. */
            let newDocument = document.createElement("li");
            const fileName = target.files[0].name;
            const fileSize = target.files[0].size;
            const fileType = target.files[0].type.split('/').pop();

            /* Setting the class attribute of the newDocument element. */
            newDocument.setAttribute("class", "py-3 flex justify-between items-end text-sm text-slate-700 border-b-2 border-slate-100 document-file")

           /* Setting the html markup of the new element and setting the file name, file size, and file type. */
            newDocument.innerHTML = `
            <p class="whitespace-nowrap overflow-hidden text-ellipsis w-40"><i class="fa-solid text-xl mr-5 ${fileTypeLogo(fileType)}"></i> 
            <span>${fileName}<span></p>
            <p>${fileType}</p>
            <p>${Number.parseFloat(fileSize / (1024 * 1024)).toFixed(2)}mb</p>
            <p>Uploaded</p>
            <button class="delete-document"><i class="fa-solid fa-trash"></i></button>
            `
            /* Adding the newDocument element to the documentImages element. */
            documentImages.append(newDocument)
            /* This is adding the file name to the documentFileObj object. */
            documentFileObj["fileName"].push(fileName)
        }
        else {
            filetypeErrorMessage.classList.remove("hidden")
        }
    }
}