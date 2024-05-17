import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage =() => {

    const [weatherData, setWeatherData] = useState(null);
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [forecast, setForecast] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; 
    useEffect(() => {
        fetchWeatherData('6.927079', '79.861244');
        fetchForecastData('6.927079','79.861244');
    }, []);

    const fetchWeatherData = async (latitude, longitude) => {
        try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        console.log("data", response.data.current)
        } catch (error) {
        console.error('Error fetching weather data', error);
        }
    };

    const fetchForecastData = async (latitude, longitude) => {
        try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`   
        );
        setForecast(response.data.daily);
        console.log("data", response.data.daily)
        } catch (error) {
        console.error('Error fetching forecast data', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        try{
          if (lat && lon) {
            fetchWeatherData(lat, lon);
            fetchForecastData(lat, lon);
          }
        }catch(error){

        }
        
    };


    return(
        <div className=" w-full h-full text-slate-200 text-[0.8rem] pt-10 bg-slate-500">
          <h1 className="text-3xl text-white font-serif justify-center text-center p-10 py-5 font-bold mb-1">Weather Information</h1>
          {weatherData && (
            <div className=' mt-0 mb-0 m-10 bg-slate-800 p-10 py-16'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full h-full'>
                <div className='flex w-full relative rounded-[1rem] items-center content-center bg-slate-500 border-[0.2rem] border-purple-800 shadow-xl shadow-purple-800 justify-center'>
                  <div className='flex w-2/3 flex-col p-5 m-5 rounded-[3rem] justify-center border-[0.5rem] bg-slate-700 border-purple-100 shadow-2xl shadow-purple-100 items-center content-center hover:bg-slate-600 transition duration-200 ease-linear hover:border-purple-900'>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`} alt='' className=' rounded-[50%]  bg-slate-400 justify-center w-32 h-32'/>
                    <h2 className="text-3xl font-bold text-white justify-center">{weatherData.timezone}</h2>
                    <p className=' justify-center text-2xl'> {weatherData.current.weather[0].description}</p>
                  </div>
                  <div className='flex flex-col w-1/3 h-full gap-3 p-2'>
                    <div className='flex flex-col h-1/2 justify-center items-center p-3 bg-slate-700 border-purple-100 border-[0.1rem] rounded-[1rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:border-purple-900'>
                      <h1 className='text-[1rem] font-bold text-white'>Temperature</h1>
                      <img src='../icons8-temperature-48.png' alt='' className=' w-14 h-14'/>
                      <p> {(weatherData.current.temp - 273.15).toFixed(2)}°C</p>
                      <p>Feels like {(weatherData.current.feels_like - 273.15).toFixed(2)}°C</p>
                    </div>
                    <div className='flex flex-col h-1/2 justify-center items-center bg-slate-700  border-[0.1rem]  border-purple-100 rounded-[1rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:border-purple-900'>
                      <h1 className='text-[1rem] font-bold text-white'>UV</h1>
                      <img src='../icons8-uv-64.png' alt='' className=' w-14 h-14'/>
                      <p>{(weatherData.current.uvi - 273.15).toFixed(2)}°C</p>
                    </div>
                  </div>
                  
                </div>
                <div className='grid grid-cols-3 sm:grd-cols-3 rounded-[1rem] bg-transparent'> 
                  <div className='flex flex-col justify-center text-center items-center p-3   rounded-[1rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Pressure</h1>
                    <img src='../icons8-pressure-48.png' alt='' className=' w-12 h-12'/>
                    <p>{(weatherData.current.pressure - 273.15).toFixed(2)}hPa</p>
                  </div>
                  <div className='flex flex-col justify-center text-center items-center p-3  rounded-[0.5rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Humidity</h1>
                    <img src='../icons8-humidity-48.png' alt='' className=' w-12 h-12'/>
                    <p>{(weatherData.current.humidity - 273.15).toFixed(2)}%</p>
                  </div>
                  <div className='flex flex-col justify-center text-center items-center p-3  rounded-[0.5rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Dew Point</h1>
                    <img src='../icons8-dew-point-48.png' alt='' className=' w-12 h-12'/>
                    <p>{(weatherData.current.dew_point - 273.15).toFixed(2)}°C</p>
                  </div>
                  <div className='flex flex-col justify-center text-center items-center p-3 rounded-[0.5rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Visibility</h1>
                    <img src='../icons8-visible-100.png' alt='' className=' w-12 h-12'/>
                    <p>{(weatherData.current.visibility - 273.15).toFixed(2)}°C</p>
                  </div>
                  <div className='flex flex-col justify-center text-center items-center p-3  rounded-[0.5rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Clouds</h1>
                    <img src='../icons8-clouds-100.png' alt='' className=' w-12 h-12'/>
                    <p>{(weatherData.current.clouds - 273.15).toFixed(2)}°C</p>
                    </div>
                  <div className='flex flex-col justify-center text-center items-center p-3   rounded-[0.5rem]  shadow-sm shadow-purple-800 hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                      <h1 className='text-[1rem] font-bold text-white'>Wind Speed</h1>
                      <img src='../icons8-wind-64.png' alt='' className=' w-12 h-12'/>
                      <p>Speed {(weatherData.current.wind_speed- 273.15).toFixed(2) }m/s</p>
                      {/* <p>Wind Deg {(weatherData.current.wind_deg- 273.15).toFixed(2) }deg</p> */}
                  </div>
                </div>
              </div>          
            </div>
          )}
        <div className=" flex fixed w-full items-center bottom-0 justify-center bg-slate-200 py-5 my-0 z-10">
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="p-2 bg-slate-100 placeholder-slate-700 text-[black] border-[0.2rem] border-purple-800 rounded-[0.5rem] mr-2"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="p-2 bg-slate-100 border-[0.2rem] placeholder-slate-700 text-[black] border-purple-800  rounded-[0.5rem] mr-2"
          />
          <button onClick={handleSearch} className="p-2 w-20 text-[1rem]  bg-purple-800 shadow-sm text-white rounded">
            Search
          </button>
        </div>
        {forecast && (
          <div className="flex flex-col m-10 ">
            <h3 className="text-[2rem] text-[white] m-10 mt-20 font-bold">Weekly Forecast</h3>
            {forecast.slice(0 ,3).map((day, index) => (
              <div key={index} className=' pt-2 p-2 bg-slate-600 rounded-[1rem] m-1'>
                <p className='text-[1.3rem] p-1 text-white'>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
                <div className='grid grid-cols-2 md:grid-cols-4 relative gap-1 p-1 w-full'>
                  <div className=' flex flex-col justify-center p-3 shadow-sm rounded-md bg-slate-800 items-center hover:bg-slate-900 transition duration-200 ease-linear hover:shadow-white'>
                    <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt='' className=' rounded-[50%]  bg-slate-400 w-25 h-25'/>
                    <p className='text-[1.1rem] font-bold text-white'>{day.weather[0].description}</p>
                    <p className='text-[0.9rem]'>{day.summary}</p>
                  </div>
                  <div className='flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Sunrise & Sunset</h1>
                    <div className=' flex flex-row justify-center p-3 gap-10  items-center'>
                      <div className=' flex flex-col justify-center content-center items-center'>
                        <img src='../icons8-sunrise-48.png' alt='' className=' w-12 h-12'/>
                        <p>{new Date(day.sunrise * 1000).toLocaleTimeString()}</p>
                      </div>
                      <div className=' flex flex-col justify-center content-center items-center'>
                        <img src='../icons8-sunset-48.png' alt='' className=' w-12 h-12'/>
                        <p>{new Date(day.sunset * 1000).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className=' flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Temperature</h1>
                    <img src='../icons8-temperature-48.png' alt='' className=' w-12 h-12'/>
                    <p>Day - {day.temp.day}°C, feels like {day.temp.day}°C</p>
                    <p>Night - {day.temp.day}°C, feels like {day.temp.night}°C</p>
                  </div>
                  <div className=' flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                    <h1 className='text-[1rem] font-bold text-white'>Rain</h1>
                    <img src='../icons8-rain-48.png' alt='' className=' w-12 h-12'/>
                    <p>{day.rain}</p>
                  </div>
                </div>                
              </div>
            ))}
            {showMore && forecast.slice(3,7).map((day, index) => (
              <div key={index} className=' pt-2 p-2 bg-slate-600 rounded-[1rem] m-1'>
              <p className='text-[1.3rem] p-1 text-white'>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
              <div className='grid grid-cols-2 md:grid-cols-4 relative gap-1 p-1 w-full'>
                <div className=' flex flex-col justify-center p-3 shadow-sm rounded-md bg-slate-700 items-center hover:bg-slate-900 transition duration-200 ease-linear hover:shadow-white'>
                  <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt='' className=' rounded-[50%]  bg-slate-400 w-25 h-25'/>
                  <p className='text-[1.1rem] font-bold text-white'>{day.weather[0].description}</p>
                  <p className='text-[0.9rem]'>{day.summary}</p>
                </div>
                <div className='flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                  <h1 className='text-[1rem] font-bold text-white'>Sunrise & Sunset</h1>
                  <div className=' flex flex-row justify-center p-3 gap-10  items-center'>
                    <div className=' flex flex-col justify-center content-center items-center'>
                      <img src='../icons8-sunrise-48.png' alt='' className=' w-12 h-12'/>
                      <p>{new Date(day.sunrise * 1000).toLocaleTimeString()}</p>
                    </div>
                    <div className=' flex flex-col justify-center content-center items-center'>
                      <img src='../icons8-sunset-48.png' alt='' className=' w-12 h-12'/>
                      <p>{new Date(day.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
                <div className=' flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                  <h1 className='text-[1rem] font-bold text-white'>Temperature</h1>
                  <img src='../icons8-temperature-48.png' alt='' className=' w-12 h-12'/>
                  <p>Day - {day.temp.day}°C, feels like {day.temp.day}°C</p>
                  <p>Night - {day.temp.day}°C, feels like {day.temp.night}°C</p>
                </div>
                <div className=' flex flex-col justify-center p-3 rounded-md shadow-lg items-center hover:bg-slate-600 transition duration-200 ease-linear hover:shadow-white'>
                  <h1 className='text-[1rem] font-bold text-white'>Rain</h1>
                  <img src='../icons8-rain-48.png' alt='' className=' w-12 h-12'/>
                  <p>{day.rain}</p>
                </div>
              </div>                
            </div>
            ))}
            <div className='flex m-10 mb-20 h-full justify-end items-end'>
              <button onClick={() => setShowMore(!showMore)} className=" text-[1.2rem] py-2 px-5 shadow-2xl bg-purple-800 text-white rounded ">
                {showMore? "Show Less": "Show More"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
};
 export default HomePage