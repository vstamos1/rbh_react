
import React, {useState} from 'react'
import styled from 'styled-components';
import {Formik} from 'formik';
import Button from '../../../components/UI/Forms/Button/Button'
import Heading from '../../../components/UI/Headings/Heading'

import DateTimePicker from 'react-datetime-picker';

const Wrapper = styled.div`
margin-top: 80px;
`

const StyledHeading = styled(Heading)`
   text-align: center;
   color: black
`

const ButtonWrapper = styled(Button)`
display: none;
`

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 100px;
  height: 500px;
  transform: translate(-50%, -50%);


& option {
  padding: 30px;
}

& #jobDetails {
    display: block;
}


  ${'' /* @media ${props => props.theme.mediaQueries.small} {
    top: 54px;
  } */}
  `

  const Banner = styled.div`
    display: block;
    background-color: var(--color-limeGreen);
    position: absolute;
    top: 6rem;
    left:0;
    width: 100%;
    text-align: center;
    padding: 15px;
    font-weight: 700;
    

  `
  const DateInput = styled(DateTimePicker)`
    background-color: var(--color-mainYellow);
    padding:0;
    border: none;
    font-size: 15px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    color: var(--color-limeGreen);
    outline: none;
    margin-left: -30px;
    width: 100%

    & .react-datetime-picker__inputGroup__input{
    color: var(--color-limeGreen);
}
  `
  const CheckInput = styled.input`
  
  margin:0;
  margin-top: 1rem;
  height: 40px;
  width: 40px;

`

const Select = styled.select`
  background-color: var(--color-mainYellow);
  color: var(--color-limeGreen);
  padding: 12px;
  width: 290px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
  margin: 2px;

& ::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 10px;
  right: 0px;
  width: 20%;
  height:100%;
  text-align: center;
  font-size: 28px;
  display: block;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

& .selects:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}
`;

const CheckWrapper = styled.div`
width: 100%;
text-align: center
`
const Label = styled.label`
    font-size: 2.4rem
`
const LawnMaint = (details) => {
    const [date, setDate] = useState([new Date()]);
    const onChange = (date) => {
        setDate(date);
        console.log(date)
    }
    
    //const [typeSelected, setTypeSelected, DetailSelected] = useState(false);
    
    return (
        
        <Formik>
        <Wrapper>
        <Banner><Heading color='white' noMargin size='h1'>Lawn Maintenance</Heading></Banner>
        <Box className='box'>
        <StyledHeading size='h2'>Just need the deets</StyledHeading>
        <Select  name="jobDetails" className="selects" id="jobDetails">
        <option value="none">Select One...</option>
            <option value="mowWeedEatAll">Mow and weed eat all</option>
            <option value="mowWeedEatFront">Mow and weed eat front only</option>
            <option value="mowWeedEatBack">Mow and weed eat back only</option>
        </Select>

        <DateInput onChange={onChange}
          value={date}>   
        </DateInput>

        <CheckWrapper>
            <CheckInput style={{zoom:'1.2'}} type='checkbox' /><Label>ASAP</Label>
        </CheckWrapper>

        {/* <DateInput
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2019-01-01T12:00"
        className={''}
        InputLabelProps={{
          shrink: true,
        }}
        /> */}


        </Box>

        <ButtonWrapper >Submit</ButtonWrapper>
        </Wrapper>
        </Formik>
    )
}
export default LawnMaint