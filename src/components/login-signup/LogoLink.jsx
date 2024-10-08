// src/components/common/LogoLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/agteach.png'

const LogoLink = ({ linkTo = "/", imgSrc = Logo, altText = "Logo", imgHeight = "120px" }) => {
  return (
    <Link to={linkTo}>
      <img
        src={imgSrc}
        alt={altText}
        style={{ maxHeight: imgHeight, maxWidth: '100%' }}
      />
    </Link>
  );
};

export default LogoLink;