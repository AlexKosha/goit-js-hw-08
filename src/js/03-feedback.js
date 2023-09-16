import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  const values = localStorage.getItem(STORAGE_KEY);
  if (values) {
    console.log(JSON.parse(values));
  }

  e.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    refs.textarea.value = parsedData.message;
    refs.input.value = parsedData.email;
  }
}
