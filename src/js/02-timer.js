import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}   
refs.btnStart.disabled = true;


class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.finalDate = null;
        this.finalDateTimer,
        this.dateDifference = null;
        this.onTick = onTick;
    }


    init(finalDate) {
        this.finalDate = finalDate;
        this.dateDifference = finalDate - Date.now();
        if (this.dateDifference < 0) {
            return true;         
        } else {
            return false;
        }
    }

    start() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.finalDateTimer = this.finalDate;
        this.intervalId = setInterval(() => { 
            this.dateDifference = this.finalDateTimer - Date.now();
            if (this.dateDifference < 0) {
                this.dateDifference = 0;
                Notify.info('Final timer', {position: "center-top"});
                clearInterval(this.intervalId);
            }
            this.onTick(this.convertMs(this.dateDifference));
        }, 1000)
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockface,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: datetimePickerClosed,
};

flatpickr('#datetime-picker', options);

function datetimePickerClosed(selectedDates) {
    const validDate = timer.init(selectedDates[0]);
    if (validDate) {
        refs.btnStart.disabled = true;
        Notify.failure('Please choose a date in the future', {position: "center-top"});
    } else {
        refs.btnStart.disabled = false;
        Notify.success('Valid date selected', {position: "center-top"});
    }
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));

function updateClockface({days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};
