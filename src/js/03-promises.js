import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', promiseOut);

function promiseOut(event) {
  event.preventDefault();

  const firstDelayInput = Number(document.querySelector('[name = "delay"]').value);
  const stepInput = Number(document.querySelector('[name = "step"]').value);
  const amountInput = Number(document.querySelector('[name = "amount"]').value);

  for (let i = 0; i < amountInput; i++) {
    createPromise(i + 1, firstDelayInput + i * stepInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
