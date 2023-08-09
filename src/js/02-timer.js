// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const selector = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysIndicator = document.querySelector('[data-days]');
const hoursIndicator = document.querySelector('[data-hours]');
const minutesIndicator = document.querySelector('[data-minutes]');
const secondsIndicator = document.querySelector('[data-seconds]');
let selectedDate = new Date();
let countdownIntervalId = null;

startBtn.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);

    if (selectedDate <= new Date()) {
      startBtn.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
      //window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(selector, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  selector.setAttribute('disabled', '');

  countdownIntervalId = setInterval(() => {
    if (selectedDate <= new Date()) {
      clearInterval(countdownIntervalId);
      daysIndicator.textContent = '00';
      hoursIndicator.textContent = '00';
      minutesIndicator.textContent = '00';
      secondsIndicator.textContent = '00';
      //What the best way to disabled element: element.setAttribute('disabled', '') OR element.disabled = true; ?
      startBtn.disabled = false;
      selector.disabled = false;
    } else {
      indicator = convertMs(selectedDate - new Date());
      daysIndicator.textContent = addLeadingZero(indicator.days);
      hoursIndicator.textContent = addLeadingZero(indicator.hours);
      minutesIndicator.textContent = addLeadingZero(indicator.minutes);
      secondsIndicator.textContent = addLeadingZero(indicator.seconds);
    }
  }, 1000);
});
