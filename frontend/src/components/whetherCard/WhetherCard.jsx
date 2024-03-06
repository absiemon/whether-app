import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './WhetherCard.css';

const CityCard = ({
  forecast,
  selectedUnit,
}) => {
  //useState for card flip
  const [isFrontSide, setIsFrontSide] = useState(true);
  const cityName = localStorage.getItem('city')

  return (
    <div className='card-container'>
      {/* card flip container */}
      <div
        data-testid='t_flipped_container'
        className={['flipped-container', isFrontSide ? 'front' : 'back'].join(
          ' '
        )}
        onClick={() => setIsFrontSide((prev) => !prev)}
      >
        <div
          //if city name length is more than 9 make it smaller font-size
          className={['city-name'].join(
            ' '
          )}
        >
          <p>{new Date(forecast?.dt * 1000).toDateString()}</p>
        </div>
        <div className='info-container'>
          {isFrontSide ? (
            // front side of card
            <>
              <p className='city'>{cityName}</p>
              <p className='info-item first'>
                {forecast?.temp?.day?.toFixed(0)}
                {selectedUnit ==='metric' ? '° C' : '° F'}
              </p>
              <p className='info-item'>{forecast?.pressure} Pa</p>

              <div className='img-container'>
                <img
                  className='img'
                  alt='weather_icon'
                  src={require(`../../../public/img/${forecast?.weather[0]?.icon?.slice(
                    0,
                    2
                  )}.svg`)}
                />
              </div>

              <p className='description'>{forecast?.weather[0]?.description}</p>
            </>
          ) : (
            // back side of card with more information
            <>
              <p className='info-item-back'>
                Min {forecast?.temp?.min?.toFixed(0)}° C
              </p>
              <p className='info-item-back'>
                Max {forecast?.temp?.max?.toFixed(0)}° C
              </p>
              <p className='info-item-back'>
                Feels like {forecast?.feels_like?.day?.toFixed(0)}° C
              </p>
              <p className='info-item-back'>Humidity {forecast?.humidity}%</p>
              
              <p className='info-item-back last'>Wind {forecast?.wind_speed} m/s</p>
            </>
          )}
        </div>

        <div className='help-text-container'>
          {isFrontSide ? (
            <p className='help-text-front'>Click for more information</p>
          ) : (
            <p className='help-text-back'>Click for less information</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default CityCard;
