import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('submit', onSubmit);

let delay = firstDelay.value;
let step = stepDelay.value;
let quantity = amount.value;

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

function onSubmit() {
  
  for (let i = 1; i <= quantity; i +=1){
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  delay += step;
}


