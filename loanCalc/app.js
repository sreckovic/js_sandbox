// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calcResults, 2000);
  e.preventDefault();
});

function calcResults() {
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  // Calc Monthly Payments
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = principal * x * calcInterest / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = (monthly * calcPayments - principal).toFixed(2);

    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your numbers');
  }
}

function showError(errMsg) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';

  const card = document.querySelector('.card');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(errMsg));

  card.insertBefore(errorDiv, document.querySelector('.heading'));

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
