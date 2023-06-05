import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnTimer = document.querySelector('[data-start]');
const daysTimerEl = document.querySelector('[data-days]');
const hoursTimerEl = document.querySelector('[data-hours]');
const minutesTimerEl = document.querySelector('[data-minutes]');
const secondsTimerEl = document.querySelector('[data-seconds]');
let delta = null;

startBtnTimer.addEventListener('click', counter);

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    let dateNow = new Date();
    if (selectDate < dateNow) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtnTimer.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function counter() {
  startBtnTimer.disabled = true;

  const timerId = setInterval(() => {
    let dateNow = new Date();
    delta = selectDate - dateNow;
    if (delta < 1000) {
      clearInterval(timerId);
    }
    updateTimeOnPage(convertMs(delta));
  }, 1000);
}

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

function updateTimeOnPage(objTime) {
  daysTimerEl.textContent = addLeadingZero(objTime.days);
  hoursTimerEl.textContent = addLeadingZero(objTime.hours);
  minutesTimerEl.textContent = addLeadingZero(objTime.minutes);
  secondsTimerEl.textContent = addLeadingZero(objTime.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
