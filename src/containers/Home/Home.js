import React from 'react';
import styled from 'styled-components';
import Jobslist from '../../components/OpenJobs/Jobslist';
import Filters from '../../components/Filters/Filters'

const Section = styled.section`
  width: 100%; 
  height: 95vh;
  padding-top: 11px;
  max-width: 1200px;
  display: flex;
  font-size: 2.2rem;
  margin: auto
  

  @media ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
  };

  & .column:nth-child(2) {
  flex-grow:2;
  flex-shrink: 2;
  flex-basis: 22px;
  padding:10px;
}


& span.right {
  float: right;
  display: none;

  @media ${props => props.theme.mediaQueries.small} {
    display: flex; 
  };
}


`;

const ColWrapper = styled.div`
background-color: var(--color-mainLighter);
width: 100%;

`

const Column = styled.div`
  margin: 10px;
  min-width: 200px;
  padding: 1.2rem;
  background-color: var(--color-mainLight);
  color: var(--color-mainYellow);
  
  
  }
 
  @media ${props => props.theme.mediaQueries.small} {
    background-color: 'red';

   
    

  }
`

const Home = () => {
  
  return (
    <ColWrapper>
  <Section >
  
    <Column className="column filters"><Filters /></Column>
    <Column className="column"><Jobslist/></Column>
   
  </Section>
  </ColWrapper>
)
};

export default Home;
