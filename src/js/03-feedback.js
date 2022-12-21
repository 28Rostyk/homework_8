const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
};
const LOCALE_STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', throttle(onFormSubmit, 250));
window.addEventListener('load', populateMessage);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(LOCALE_STORAGE_KEY);
  refs.form.reset();
}

function onInput(e) {
  e.preventDefault();
  const email = refs.form.elements.email.value;
  const message = refs.form.elements.message.value;

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify({ email, message }));
}

function populateMessage() {
  const outputTextContent = localStorage.getItem(LOCALE_STORAGE_KEY);
  const parseLocalStorage = JSON.parse(outputTextContent) || {
    email: '',
    message: '',
  };
  const { email, message } = parseLocalStorage;
  refs.form.elements.email.value = email;
  refs.form.elements.message.value = message;
}
