// Add Event Listener
document.querySelector('.plans').addEventListener('click', function(e) {
  const plans = document.querySelectorAll('.plan');

  plans.forEach(function(plan) {
    if (plan.classList.contains('selected')) plan.classList.remove('selected');
  });

  const plan = e.target.parentElement;
  const planType = plan.className.replace('plan', '').trim();

  if (!plan.classList.contains('selected')) {
    plan.classList.add('selected');
  }

  switch (planType) {
    case 'rookie':
      // Set users, gb and repos in that order
      setFeatures('10%', '8%', '8%');
      break;
    case 'pro':
      setFeatures('40%', '22%', '12%');
      break;
    case 'vip':
      setFeatures('83%', '31%', '22%');
      break;
    default:
      return;
  }
});

const setFeatures = function(users, gb, repos) {
  document.querySelector('.users .line .fill').style.width = users;
  document.querySelector('.gb .line .fill').style.width = gb;
  document.querySelector('.repos .line .fill').style.width = repos;
};
