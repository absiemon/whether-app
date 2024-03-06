import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();

import axios from 'axios'

const appId = process.env.OPENWHETHER_APPID;
const mapURI =
  process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Delhi';

router.get('/weatherbycity', async (req, res) => {
    const { city, units } = req.query;
  
    // Getting the current weather to obtain coordinates
    const currentWeatherEndpoint = `${mapURI}/weather?q=${city ? city : targetCity}&appid=${appId}&units=metric`;
  
    try {
      const currentWeatherResponse = await axios.get(currentWeatherEndpoint);
      const { lat, lon } = currentWeatherResponse?.data?.coord;
  
      // Using coordinates to get the daily forecast
      const oneCallEndpoint = `${mapURI}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=${units}&appid=${appId}`;
  
      const oneCallResponse = await axios.get(oneCallEndpoint);

      const dailyForecast = oneCallResponse.data.daily;

      //getting five days forecast
      const dataToSend = dailyForecast.slice(0, 5);
  
      return res.status(200).json(dataToSend);
    } catch (error) {
      
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/weatherbycoordinates', async (req, res) => {
    const {lon, lat, units} = req.query;
    
    try {
    
        // Using coordinates to get the daily forecast
        const oneCallEndpoint = `${mapURI}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=${units}&appid=${appId}`;
    
        const oneCallResponse = await axios.get(oneCallEndpoint);
  
        const dailyForecast = oneCallResponse.data.daily;

          //getting five days forecast
        const dataToSend = dailyForecast.slice(0, 5);
    
        return res.status(200).json(dataToSend);
      } catch (error) {
        
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  });
  

export default router;