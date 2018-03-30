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
  let field = document.getElementById(type);

  switch (type) {
    case 'name':
      let reName = /^[a-zA-z]{2,10}$/;

      if (!reName.test(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
      break;
    case 'zip':
      let reZip = /^[0-9]{5}(-[0-9]{4})?$/;

      if (!reZip.test(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
      break;
    case 'email':
      let reEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;

      if (!reEmail.test(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
      break;
    case 'phone':
      let rePhone = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

      if (!rePhone.test(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
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
