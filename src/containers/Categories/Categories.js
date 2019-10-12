

import React from 'react';
import Heading from '../../components/UI/Headings/Heading'
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Forms/Button/Button'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
display: block;
margin: 0 auto; 
max-width: 1000px;
width: 100%;
background-color: rgba(234,229,112, .8);
padding: 10px;
height: 100%;
width: 100vw

`

const Cats = styled.div`
display: flex;
width: 100%;
flex-wrap: wrap;


@media ${props => props.theme.mediaQueries.medium} {
    display: block;
  }


`
const Content = styled.div`

  display: flex;
  margin: auto;
  margin-top: 1rem;
  padding: 10px;
  
  & button {
      background-color: var(--color-limeGreen);
      color: white;
      font-size: 1.5rem;
      text-align: center;
      text-transform: capitalize;
      margin: 10px 0;
      min-width: 300px;
      min-height: 150px;
      padding: 10px;
      
      @media ${props => props.theme.mediaQueries.medium} {
        width: 100%;
        margin: 0
    }
      & .img {
          min-height: 100px;
          min-width:100px;
          float: left;
          border-radius: 2rem;
          padding: 10px;
          
      }
  }
`;


const StyledHeading = styled(Heading)`
   text-align: center;
   font-size: .7rem
`
const Categories = ({cats, requested}) => {
    let content;
  if (!cats) {
    content = (
      <Content>
        <Loader  />
      </Content>
    );
  } else {
    content = (
      <Cats>
      {console.log(cats.cat.cats)}
        {cats.cat.cats
          .slice(0)
          .map(cat => (
             
            
            <Content key={cat}><Link to='/lawn'><Button className='button'><span className='img'><img src={`https:taskitplus.com/images/${cat}.png`} alt=""/></span>{cat}</Button></Link></Content>
             
          ))}
          </Cats>
    );
          }
    return (
        <Wrapper>
            <StyledHeading size='h1'>
                What do you need done?
            </StyledHeading>
            
               {content}
               
    {/* <Select  name="jobType" className="selects" id="jobType" >
    <option value="none">Select One</option>
    <option  value="lawn maintenance">Lawn Maintenance</option>
    <option value="power washing">Power Washing</option>
    </Select> */}
        </Wrapper>
    )
}



const mapStateToProps = ({ firestore }) => ({
    cats: firestore.data.categories,
    jobs: firestore.data.jobs,
    requesting: firestore.status.requesting,
    requested: firestore.status.requested,
  });
  const mapDispatchToProps = {};


  export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => [`categories/cat`])
  )(Categories);



  
  
  
