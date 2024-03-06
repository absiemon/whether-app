import React from 'react';
import './ErrorMessages.css';

const ErrorMessages = ({ otherError, errorMsg}) => {
  return (
    <>
      {otherError && (
        <div className='error-message'>
          {errorMsg ? errorMsg : "City not found or connection lost!"}
        </div>
      )}
    </>
  );
};

export default ErrorMessages;
