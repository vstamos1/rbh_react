import React, { useState } from 'react';
import styled from 'styled-components';
import Heading from '../../components/UI/Headings/Heading'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 1rem;
  background-color: var(--color-white);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-main);
`;

const Controls = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  
  & i.fas {
    margin: 7px 2px !important;
    font-size: 2rem;
  }
`;

const Type = styled.div`
width: 23%;
position: relative;
display: block;
height:100%;

border-radius: 45%;
margin: 0;
padding: 0;
float: left;
`

const Headings = styled.div`
float: right;
width: 70%;
`


const editStyles = {
  color: 'var(--color-main)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

const deleteStyles = {
  color: 'var(--color-errorRed)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

const Job = ({ job }) => {
  const [ setisDeleting] = useState(false);
  const [ setIsEditing] = useState(false);
  const dateString = Date(job.createdOn).toString().substring(0,15);

  return (
    <Wrapper>
    
    <Type><img src='https://taskitplus.com/images/lawn.png' alt='mower'/></Type>
    <Headings className='line'>
      <Heading noMargin size='h1'>{job.type}</Heading>
      <Heading noMargin  size='h3'><p>Scheduled on: </p> {dateString}</Heading>
      <Heading noMargin  size='h3'>Apt: {job.apt}</Heading>
      </Headings> 
     
      <Controls>
        <i
          className="fas fa-edit"
          style={editStyles}
          onClick={() => setIsEditing(true)}
        />
        <i
          className="fas fa-trash-alt"
          style={deleteStyles}
          onClick={() => setisDeleting(true)}
        />
        {/* <DeleteTodo
            todo={job}
            show={isDeleting}
            close={() => setisDeleting(false)}
        />
        <InputTodo
            editTodo={todo}
            opened={isEditing}
            close={() => setIsEditing(false)}
        /> */}
      </Controls>
    </Wrapper>
  );
};

export default Job;