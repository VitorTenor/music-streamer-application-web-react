import React from 'react';
import backgroundImage from '../../assets/image.jpg';

function BackgroundImage() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
      }}
    />
  );
}

export default BackgroundImage;
