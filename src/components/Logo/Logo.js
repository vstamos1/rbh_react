import React from 'react';
import styled from 'styled-components';
import logo from './Logo.png'

const LogoWrapper = styled.div`
  color: var(--color-white);
  width: 120px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1rem;
  background-size: contain
`;

const Img = styled.img`
width: 120px
`

const Logo = () => {
  return <LogoWrapper><Img src={logo} alt="Task It Plus" /></LogoWrapper>;
};

export default Logo;
