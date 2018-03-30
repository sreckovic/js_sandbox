const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingFor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingFor: 'male',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingFor: 'female',
    location: 'Lynn MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  }
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

// Next Event
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
  const currProfile = profiles.next().value;

  if (currProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${currProfile.name}</li>
      <li class="list-group-item">Age: ${currProfile.age}</li>
      <li class="list-group-item">Location: ${currProfile.location}</li>
      <li class="list-group-item">Preference: ${
        currProfile.gender
      } looking for ${currProfile.lookingFor}</li>
    </ul>
  `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${
      currProfile.image
    }">`;
  } else {
    // No more profiles
    window.location.reload();
  }
}

//Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length
        ? {
            value: profiles[nextIndex++],
            done: false
          }
        : { done: true };
    }
  };
}
