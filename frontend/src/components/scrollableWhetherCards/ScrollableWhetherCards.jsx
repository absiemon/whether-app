import React from 'react';
import './ScrollableWhetherCards.css';
import WhetherCard from '../whetherCard/WhetherCard';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ScrollableCityCards = ({ data, selectedUnit }) => {
  // fn for scroll to left
  const slideLeft = () => {
    let slider = document.getElementById('scrollable');
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  // fn for scroll to right
  const slideRight = () => {
    let slider = document.getElementById('scrollable');
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  return (
    <div className='scrollable-container'>
      <MdChevronLeft className='arrow-btn' onClick={slideLeft} />
      <div id='scrollable' className='cities-cards-container'>
        {data?.map((forecast) => (
          <WhetherCard
            forecast={forecast}
            selectedUnit={selectedUnit}
          />
        ))}
      </div>
      <MdChevronRight className='arrow-btn' onClick={slideRight} />
    </div>
  );
};

export default ScrollableCityCards;
