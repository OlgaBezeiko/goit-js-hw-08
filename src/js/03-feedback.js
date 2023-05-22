import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Збереження значень полів у локальне сховище
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
}, 500);

// Заповнення полів форми зі значеннями з локального сховища
const fillFormFromStorage = () => {
  const formState = JSON.parse(localStorage.getItem(storageKey));
  if (formState) {
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};

// Обробка події input для збереження значень у сховище
feedbackForm.addEventListener('input', saveFormState);

// Заповнення полів форми при завантаженні сторінки
window.addEventListener('DOMContentLoaded', fillFormFromStorage);

// Обробка події submit для очищення сховища і полів форми
feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formState);

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
});

