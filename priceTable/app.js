// Add Event Listener
document.querySelector('.plans').addEventListener('click', function(event) {
  resetPlans();
  setPlan(event);
});

const setPlan = function(curr) {
  // Get selected plan
  const plan = curr.target.parentElement;
  // Get plan type
  const planType = plan.className.replace('plan', '').trim();

  // Add selected CSS class
  if (!plan.classList.contains('selected')) {
    plan.classList.add('selected');
  }

  // Set Features according to plan type
  switch (planType) {
    case 'rookie':
      // Set users, gb and repos values in that order
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
};

const setFeatures = function(users, gb, repos) {
  document.querySelector('.users .line .fill').style.width = users;
  document.querySelector('.gb .line .fill').style.width = gb;
  document.querySelector('.repos .line .fill').style.width = repos;
};

// Reset all plans, we need .plan class attached in HTML
const resetPlans = function() {
  const plans = document.querySelectorAll('.plan');

  plans.forEach(function(plan) {
    if (plan.classList.contains('selected')) {
      plan.classList.remove('selected');
    }
  });
};
