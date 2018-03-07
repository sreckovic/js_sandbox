// Add Event Listener
document.querySelector('.plans').addEventListener('click', function(e) {
  //console.log(document.querySelectorAll('.plans'));
  const plan = e.target.parentElement;
  //console.log(plan);
  const planType = e.target.parentElement.className.replace('plan', '').trim();
  console.log(planType);

  if (plan.classList.contains('selected')) {
    console.log('selected already there');
  } else {
    console.log('selected added!');
    plan.classList.add('selected');
  }

  switch (planType) {
    case 'rookie':
      datas('8%', '8%', '8%');
    case 'pro':
    case 'vip':
    default:
      return;
  }
});

const datas = function(users, gb, repos) {
  document.querySelector('.users .line .fill').style.width = users;
  document.querySelector('.gb .line .fill').style.width = gb;
  document.querySelector('.repos .line .fill').style.width = repos;
};
