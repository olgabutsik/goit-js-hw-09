
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let value = 0;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDay = new Date();
    if (selectedDates[0] < currentDay) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false
      value = selectedDates[0].getTime();
    }
    
    console.log(currentDay);
    console.log(selectedDates[0]);
  },
});


const inputField = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const selectedDay = document.querySelector('span[data-days]');
const selectedHour = document.querySelector('span[data-hours]');
const selectedMinute = document.querySelector('span[data-minutes]');
const selectedSecond = document.querySelector('span[data-seconds]');



inputField.value = formatDate();
startBtn.disabled = true;


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function formatDate(date = new Date()) {
  const inputDate = `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1
  )}-${addLeadingZero(date.getDate())} ${addLeadingZero(
    date.getHours()
  )}:${addLeadingZero(date.getMinutes())}`;

  return inputDate;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
function onClickStartBtn() {
  const timerId = setInterval(() => {
    const diff = value - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diff);
    if (diff <= 0) {
      clearInterval(timerId);
      return;
    }
    
    selectedDay.textContent = addLeadingZero(convertMs(diff).days);
    selectedHour.textContent = addLeadingZero(convertMs(diff).hours);
    selectedMinute.textContent = addLeadingZero(convertMs(diff).minutes);
    selectedSecond.textContent = addLeadingZero(convertMs(diff).seconds);
    
  }, 1000) 

};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


startBtn.addEventListener('click', onClickStartBtn);



