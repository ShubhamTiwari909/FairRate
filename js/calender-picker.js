import { Datepicker } from 'vanillajs-datepicker';

const calendarPicker = document.querySelector('#calendar-picker');
const datepickerMax = new Datepicker(calendarPicker, {
    nextArrow:"<i class='fa-solid fa-arrow-right'></i>",
    prevArrow:"<i class='fa-solid fa-arrow-left'></i>",
    orientation:"right",
    startView:0,
    clearBtn:true,
    autohide:true,
}); 