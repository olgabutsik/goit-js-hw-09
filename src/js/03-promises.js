import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener('submit', onSubmit);




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
  });

}
console.log(123)
function onSubmit(e) {
  e.preventDefault();
  let delay = Number(firstDelay.value);
  let step = Number(stepDelay.value);
  let quantity = Number(amount.value);
  for (let i = 1; i <= quantity; i +=1){
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  
}


