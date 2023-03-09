import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};  

refs.form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
   const {
    elements: { delay, step, amount }
   } = e.currentTarget;
  createPromises(Number(delay.value), Number(step.value), Number(amount.value));
  // e.currentTarget.reset();
};


function createPromises(delay, step, amount) {
  for (let i = 1; i < amount + 1; i += 1){
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + step;
  }
};

function createPromise(position, delay) {
  const promis = new Promise((resolve, reject) => { 
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promis;
}