const API_KEY = "19ba65a4f91d54c5404051decb9e86b6"; // replace with your OpenWeatherMap API key!
    const form = document.getElementById('form');
    const weatherDiv = document.getElementById('weather');
    const messageDiv = document.getElementById('message');

    form.onsubmit = async function(e) {
      e.preventDefault();
      const city = document.getElementById('city-input').value.trim();
      if (!city) return;

      weatherDiv.style.display = 'none';
      messageDiv.style.display = 'none';
      form.querySelector('button').disabled = true;
      form.querySelector('button').innerText = 'Searching...';
      try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        if (!resp.ok) throw new Error('City not found');
        const data = await resp.json();
        document.getElementById('city').textContent = data.name;
        document.getElementById('temp').textContent = Math.round(data.main.temp) + "°C";
        document.getElementById('desc').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity + "%";
        document.getElementById('wind').textContent = Math.round(data.wind.speed) + " km/h";
        document.getElementById('min').textContent = Math.round(data.main.temp_min) + "°";
        document.getElementById('max').textContent = Math.round(data.main.temp_max) + "°";
        document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        document.getElementById('icon').alt = data.weather[0].main;
        weatherDiv.style.display = '';
      } catch {
        weatherDiv.style.display = 'none';
        messageDiv.textContent = 'City not found. Please check spelling and try again.';
        messageDiv.style.display = '';
      }
      form.querySelector('button').disabled = false;
      form.querySelector('button').innerText = 'Search';
    };