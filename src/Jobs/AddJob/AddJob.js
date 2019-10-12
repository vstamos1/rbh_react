
import React, {useState} from 'react'
import styled from 'styled-components';
import {Formik, Field} from 'formik';
import Heading from '../../components/UI/Headings/Heading'

import * as Yup from 'yup';
import {  StyledForm } from '../../hoc/layout/elements';
import DatePicker from 'react-date-picker';

import Message from '../../components/UI/Message/Message';

import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Redirect } from 'react-router';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 1;
  width: 100%;
  padding: 0 3rem;
`;

const SavedMessage = styled(Message)`
& .message {
    background-color: var(--color-mainYellow);
    color: white;
    text-align: center;
    font-size: 2rem;
  }
`



const StyledHeading = styled(Heading)`
   
   display: block;
   text-align: center;
   margin: auto;
   color: black;

   & span.asap {
     margin-top: 10px;
     color: blue;
   }
`

const ButtonWrapper = styled.button`
display: block;
background-color: var(--color-mainYellow);
color: var(--color-main);


`



const Wrapper = styled.div`
  height: 100vh;
  margin:0;
  width:100%;
  padding:0;
  background-color: var(--color-mainDark);
  padding: 8rem 6rem;
  
  @media ${props => props.theme.mediaQueries.small} {
    width: 100vw;
  }
`

const Box = styled.div`
  margin-top: 20px;
  background-color: var(--color-limeGreen);
  padding: 5rem 1rem;
  color: var(--color-mainYellow);
  min-width: 320px;


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


  const DateInput = styled(DatePicker)`
    background-color: var(--color-mainYellow);
    border: none;
    font-size: 23px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    color: var(--color-limeGreen);
    outline: none;
    min-width: 80%;
    text-align: center;
    border-radius: 7px;
    margin:12px 0 0 0;
    & .react-datetime-picker__inputGroup__input{
    color: var(--color-limeGreen);
}
  `
  const CheckInput = styled.input`
    margin:0;
    height:20px;
    width: 20px;
    
`

const Select = styled.select`
  background-color: var(--color-mainYellow);
  color: var(--color-limeGreen);
  padding: 5px;
  border: none;
  border-radius: 3px;
  font-size: 23px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
  min-width: 80%;
  margin: 12px 0 0 0;

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
const StartBtn = styled.button`
      float: left;
      color: var(--color-mainYellow);
      margin: -20px 0 10px 0;
      display: block;
    `

const CheckWrapper = styled.div`
display: block;
margin:0 10px 0 0;
`
const Label = styled.label`
    font-size: 2.4rem;
    
`


const AddJob = (
  {jobs,
  addJob,
  categories
  }) => {
    const [date, setDate] = useState(new Date());
    const [details, setDetails] = useState('');
    const [type, setType] = useState('');
    const [asap, setAsap] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState(null);
    const cats = categories;
    const onChange = (newDate) => {  
      console.log('on change fired')
        setDate(new Date(newDate));
    }

    const onClick = (e) =>{
      
    }

    const submit = () => {
      console.log(date, details, asap, type);
            const res = addJob({date, details, asap, type}) 
            if (res) {
             
              setMessage('Your task has been posted');
              setTimeout(() => {
                
                setRedirect(true);
              }, 2000);
              
              resetForm();
            }
              
    }
    const selectJobType = (item) => {
      setType(item)
    }
    
    const JobSchema = Yup.object().shape({
      jobDetails: Yup.string()
        .required('The details are required.')
        
    });
    if (jobs){
      console.log(jobs);
    }else{
      console.log('no jobs');
    }

    
    const asapChange = () => {
      setAsap(!asap)
      console.log(asap)
    }
    const resetForm = () => {
      setAsap(false);
      setDetails('');
      setType('');
      setDate(new Date());
    
    }

    let content;
  if (cats){

  
    content = (
      <Field component={Select} name="jobType" className="selects" id="jobType" type='select' onChange={(e) => selectJobType(e.target.value)} >
            <option value="none">Select Job Type</option>
        {console.log(cats.cat.cats)}
        {cats.cat.cats
          .slice(0)
          .map(cat => (
           
            <option value={cat} key={cat}> {cat}</option>
             
             
          ))
        }
          
      </Field>   
    //const [typeSelected, setTypeSelected, DetailSelected] = useState(false);
    )
  }

  let detailsSelect ;
  switch(type) {
    case 'lawn maintenance':
      // code block
      detailsSelect = (
        <Field component={Select} name="jobDetails" className="selects" id="jobDetails" type='select' onChange={(e) =>{console.log(details); setDetails(e.target.value)}} >
                <option value="none">Select One...</option>
                <option value="mowWeedEatAll">Mow and weed eat all</option>
                <option value="mowWeedEatFront">Mow and weed eat front only</option>
                <option value="mowWeedEatBack">Mow and weed eat back only</option>
          </Field>
      )
      break;
    case 'power washing':
      // code block
      detailsSelect = (
        <Field component={Select} name="jobDetails" className="selects" id="jobDetails" type='select' onChange={(e) =>{console.log(details); setDetails(e.target.value)}} >
                <option value="none">Select One...</option>
                <option value="front">Front</option>
                <option value="back">Back</option>
                <option value="mowWeedEatBack">Both</option>
          </Field>
      )
      break;
    default:
      // code block
  }
  
    return (
      
        <>
        {redirect ? <Redirect push to='/userJobs' />:<div></div>}
        <Banner><Heading color='white' noMargin size='h1'>Add A Task</Heading></Banner>
        <Wrapper>
        
        <StyledForm>
       
        <Formik 
        initialValues={{
            jobDetails: '',
            type: '',
            date: '',
            asap: '',
            

          }}
          validationSchema={JobSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // send our job
            console.log(values);
            const res = addJob(values)

              console.log(values);
            if (res) {
              console.log(res);
            }
            setSubmitting(false);
            ;
          }}>
        
        <Box>
        <StartBtn onClick={resetForm} >Start Over</StartBtn>
        <StyledHeading size='h2' noMargin >Just need some deets</StyledHeading>
        {!type && <div><StyledHeading size='h3' noMargin >What category?</StyledHeading>
        {content}
        </div>
        }
        {type != '' && <div><StyledHeading size='h3' noMargin >Alright. What do you need done?</StyledHeading>
        {detailsSelect}
        </div> 
        }
            
        {!asap && <Field
            type="date"
            name="date"
            component={DateInput}
            onChange={onChange} onClick={onClick}
            value={date}
              />}
       
        {!asap && <StyledHeading color='white' noMargin size='h4'> -- or -- </StyledHeading>}

        
        <CheckWrapper>
            <Field style={{zoom:'1.2'}} name='asap' type='checkbox' onClick={asapChange} component={CheckInput}/><Label>ASAP</Label>
        </CheckWrapper>

        <ButtonWrapper color="main" onClick={submit} type='button'>Submit</ButtonWrapper>
        
          <MessageWrapper >
            <SavedMessage className='message' success show={message}>
              {message}
            </SavedMessage>
          </MessageWrapper>
        </Box>
       
        </Formik>
       
        </StyledForm>
        </Wrapper>
        </>
    )
}

const mapStateToProps = ({ firestore, firebase, jobs}) => ({
  categories: firestore.data.categories,
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
  loading: jobs.loading,
  error: jobs.error,

  
  
});



const mapDispatchToProps = {
  addJob: actions.addJob,
  editJobAction: actions.editJob,
  
};


export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: 'categories',
      
    }
  ]),
  
)(AddJob);
  
  
