import { Datepicker } from 'vanillajs-datepicker';

const calendarPicker = document.querySelector('#calendar-picker');
/* Creating a new instance of the datepicker. */
const datepickerMax = new Datepicker(calendarPicker, {
   /* A configuration object. */
    nextArrow:"<i class='fa-solid fa-arrow-right'></i>",
    prevArrow:"<i class='fa-solid fa-arrow-left'></i>",
    orientation:"right",
    startView:0,
    clearBtn:true,
    autohide:true,
}); 