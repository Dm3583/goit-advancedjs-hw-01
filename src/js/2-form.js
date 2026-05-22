const formData = { email: '', message: '' };

const formEl = document.querySelector('.feedback-form');

const fillForm = () => {
  try {
    const savedFormData = localStorage.getItem('feedback-form-state');

    if (savedFormData === null) {
      return;
    }

    const parsedFormData = JSON.parse(savedFormData);

    Object.entries(parsedFormData).forEach(([key, value]) => {
      formEl.elements[key].value = value;
      formData[key] = value;
    });
  } catch (error) {
    console.log(error);
  }
};

const onFormInput = ({ target }) => {
  try {
    formData[target.name] = target.value.trim();

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (error) {
    console.log(error);
  }
};

const onFormSubmit = event => {
  event.preventDefault();

  const formDataValues = Object.values(formData);

  const isFormDataEmpty = formDataValues.some(value => value.trim() === '');

  if (isFormDataEmpty) {
    alert('Fill please all fields.');
    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  formEl.reset();
};

fillForm();
formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);
