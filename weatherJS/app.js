// init Storage class
const storage = new Storage();

const weatherLocation = storage.getLocationData();

// init Weather class
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// init UI class
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather());

// Change location event
document.getElementById('w-change-btn').addEventListener('click', e => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);
  storage.setLocationData(city, state);
  getWeather();
  $('#locModal').modal('hide');
});

function getWeather() {
  weather
    .getWeather()
    .then(res => ui.paint(res))
    .catch(err => console.log(err));
}
