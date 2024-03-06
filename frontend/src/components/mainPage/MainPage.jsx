import React, { useEffect, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import ErrorMessages from '../errorMessages/ErrorMessages';
import ScrollableWhetherCards from '../scrollableWhetherCards/ScrollableWhetherCards';
import './MainPage.css';
import axios from 'axios'

const MainPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [cityName, setCityName] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('metric')
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
  const [firstLoad, setFirstLoad] = useState(true);

  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  let preventManyTimeCallLocationFn = 0; // don't let u call fn "setCityWeatherDataByCityLocation()" more than 1 time per fetch

  // LocalStorage functionality
  // when u load the page the first time, check local storage for saved items
  useEffect(() => {
    if (firstLoad) {
      const item = localStorage.getItem('weather_data_ds_eficode');
      const city = localStorage.getItem('city')

      if (item !== undefined) {
        setWeatherData(JSON.parse(item));
      }
      if(city !== undefined){
        setCityName(city)
      }
      setFirstLoad(false);
    }
  }, []);

  // every time (but not in the first load) when an item is removed or added to weatherData, updates local storage
  useEffect(() => {
    if (!firstLoad) {
      localStorage.setItem(
        'weather_data_ds_eficode',
        JSON.stringify(weatherData)
      );
      localStorage.setItem('city', cityName)
      localStorage.setItem('units', selectedUnit)
    }
  }, [weatherData]);

  useEffect(()=>{
    if(cityName && selectedUnit){
      getWeatherDataFromAPIbyCityname()
    }
  },[selectedUnit])

  useEffect(()=>{
    if(latitude && longitude && selectedUnit){
      getWeatherDataFromAPIbyLocation(longitude, latitude);
    }
  },[latitude, longitude, selectedUnit])

  // fetch weather data from backend by city name
  const getWeatherDataFromAPIbyCityname = async () => {
    if (!cityName) {
      setError(true)
      setErrorMsg("Please enter city!")
      return;
    }
    setLoading(true)

    setError(false)
    setErrorMsg('')
    await axios.get(`https://whether-app-server.onrender.com/api/weatherbycity?city=${cityName}&units=${selectedUnit}`)
      .then((response) => {
        const data = response?.data
        if (data?.length === 0) {
          setError(true);
          return;
        }
        setWeatherData(data)
        setError(false);
        setLoading(false)

      })
      .catch((error) => {
        setError(true);
        setLoading(false)

      })
  };

  // fetch weather data from backend by location
  const getWeatherDataFromAPIbyLocation = async (lon, lat) => {

    setLoading(true)

    await axios.get(`https://whether-app-server.onrender.com/api/weatherbycoordinates?lon=${lon}&lat=${lat}&units=${selectedUnit}`)
      .then((response) => {
        const data = response?.data
        if (data?.length === 0) {
          setError(true);
          setLoading(false)
          return;
        }
        setWeatherData(data)
        setError(false);
        setLoading(false)

      })
      .catch((error) => {
        setError(true);
        setLoading(false)

      })
  };


  // trying to add new data by city location
  // if it is not already present in the weather data
  const setCityWeatherDataByCityLocation = async () => {
    preventManyTimeCallLocationFn += 1;

    // don't let u call fn "setCityWeatherDataByCityLocation()" more than 1 time per fetch
    if (preventManyTimeCallLocationFn !== 1) {
      return;
    }
    // get my geolocation
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      setLatitude(lat)
      setLongitude(lon)

      // fetch weather data from API and add it to the weather data
      // if it is not already present in the weather data
      await getWeatherDataFromAPIbyLocation(lon, lat);

      // update value for the possibility use this Fn next time
      await setTimeout(() => {
        preventManyTimeCallLocationFn = 0;
      }, 0);
    });
  };

  const clearCache = ()=>{
    localStorage.removeItem('weather_data_ds_eficode')
    localStorage.removeItem('city')
    localStorage.removeItem('units')
    window.location.reload()
  }

  return (
    <div className='main-container'>
      {/* component with error messages */}
      <ErrorMessages
        otherError={error}
        errorMsg={errorMsg}
      />
      {/* search bar  */}
      <div className='search-bar'>
        <input
          className='input-field'
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder='Enter the city name'
          onKeyDown={(e) =>
            e.key === 'Enter' && getWeatherDataFromAPIbyCityname()
          }
        />
        <div className='btn-container'>
          <button
            className='btn-search'
            onClick={() => getWeatherDataFromAPIbyCityname()}
          >
            {loading? 'Searching...' : 'Search'}
          </button>
          <button
            className='btn-location'
            data-testid='t_geolocation_btn'
            onClick={() => setCityWeatherDataByCityLocation()}
          >
            <MdMyLocation size={30} />
          </button>
        </div>

        <select 
          name="temp" 
          id="temp" 
          className="select-temp"
          value={selectedUnit}
          onChange={(e)=> setSelectedUnit(e.target.value)}
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>

        <button className='btn-search'
            onClick={() => clearCache()}
          >
          Clear cache
        </button>

      </div>
      {/* scrollable city cards component */}
      {weatherData?.length > 0 && (
        <ScrollableWhetherCards
          data={weatherData}
          selectedUnit={selectedUnit}
        />
      )}
    </div>
  );
};

export default MainPage;
