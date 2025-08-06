'use client';

import { useEffect, useState } from 'react';

export default function WeatherData() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=17.453101731071467&lon=78.68186538383672&appid=86d51960c36a0b664453ee16948001bd'
    )
      .then((res) => res.json())
      .then(setWeather);
  }, []);

  if (!weather) return <div className="text-center p-4">Loading weather data...</div>;

  const tempC = (weather.main.temp - 273.15).toFixed(1);
  const feelsLike = (weather.main.feels_like - 273.15).toFixed(1);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const date = new Date(weather.dt * 1000).toLocaleDateString('en-IN');
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-IN');
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-IN');

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Weather Update ({date})</h2>
      <div className='flex flex-col gap-y-4 lg:flex-row lg:gap-x-20'>
        <div className="flex space-x-4">
          <img src={iconUrl} alt="weather icon" className="w-16 h-16" />
          <div>
            <p className="text-3xl font-bold text-blue-600">{tempC}°C</p>
            <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Feels Like:</p>
            <p>{feelsLike}°C</p>
          </div>
          <div>
            <p className="font-semibold">Humidity:</p>
            <p>{weather.main.humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">Wind:</p>
            <p>{weather.wind.speed} m/s @ {weather.wind.deg}°</p>
          </div>
          <div>
            <p className="font-semibold">Cloudiness:</p>
            <p>{weather.clouds.all}%</p>
          </div>
          <div>
            <p className="font-semibold">Altitude:</p>
            <p>Above sea level {weather.main.grnd_level} ft</p>
          </div>
          <div>
            <p className="font-semibold">Sunrise:</p>
            <p>{sunrise}</p>
          </div>
          <div>
            <p className="font-semibold">Sunset:</p>
            <p>{sunset}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
