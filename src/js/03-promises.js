import Notiflix from 'notiflix';

const myForm = document.querySelector('.form');

myForm.addEventListener('submit', event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const dataObj = {
    delayInt: parseInt(delay.value),
    stepInt: parseInt(step.value),
    amountInt: parseInt(amount.value),
  };

  for (let i = 0; i < dataObj.amountInt; i++) {
    createPromise(i + 1, dataObj.delayInt + i * dataObj.stepInt)
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
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
