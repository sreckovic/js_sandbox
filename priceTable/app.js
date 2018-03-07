// Add Event Listener
document.querySelector('.plans').addEventListener('click', function(e) {
  const plans = document.querySelectorAll('.plan');
  //console.log(document.querySelectorAll('.plan').classList);

  plans.forEach(function(plan) {
    if (plan.classList.contains('selected')) plan.classList.remove('selected');
    //console.log(plan.target.classList.contains('selected'));
  });

  const plan = e.target.parentElement;
  console.log(plan);
  const planType = e.target.parentElement.className.replace('plan', '').trim();
  //console.log(planType);

  if (plan.classList.contains('selected')) {
    console.log('selected already there');
  } else {
    console.log('selected added!');
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
  //console.log('datas() done!');
};
