document.getElementById('name').addEventListener('blur', () => {
  validate('name');
});
document.getElementById('zip').addEventListener('blur', () => {
  validate('zip');
});
document.getElementById('email').addEventListener('blur', () => {
  validate('email');
});
document.getElementById('phone').addEventListener('blur', () => {
  validate('phone');
});

function validate(type) {
  let val = document.getElementById(type);

  switch (type) {
    case 'name':
      const name = document.getElementById('name');
      console.log(name.value);
      const re = /^[a-zA-z]{2,10}$/;

      if (!re.test(name.value)) {
        name.classList.add('is-invalid');
      } else {
        name.classList.remove('is-invalid');
      }
      break;
    case 'zip':
      console.log(val.value);
      break;
    case 'email':
      console.log(val.value);
      break;
    case 'phone':
      console.log(val.value);
      break;
    default:
      break;
  }
}

function validateName() {
  const name = document.getElementById('name');
  console.log(name.value);
  const re = /^[a-zA-z]{2,10}$/;

  if (!re.test(name.value)) {
    name.classList.add('is-invalid');
  } else {
    name.classList.remove('is-invalid');
  }
}

function validateZip() {
  const name = document.getElementById('name').value;
}

function validateEmail() {
  const name = document.getElementById('name').value;
}

function validatePhone() {
  const name = document.getElementById('name').value;
}
