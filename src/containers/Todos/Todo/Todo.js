import React, { useState } from 'react';
import styled from 'styled-components';

import DeleteJob from '../../../Jobs/MyJobs/DeleteJob';
import DeleteTodo from './DeleteTodo/DeleteTodo';
import InputTodo from '../InputTodo/InputTodo';
import Heading from '../../../components/UI/Headings/Heading'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 4rem 3rem;
  background-color: var(--color-limeGreen);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  
`;

const Controls = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  padding: 1rem;
  margin: 0;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  
  & i.fas {
    margin: 7px 2px !important;
    font-size: 2rem;
  }
`;

const editStyles = {
  color: 'var(--color-main)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

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
color: black;
margin-top:15px
`
const deleteStyles = {
  color: 'var(--color-errorRed)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

const Todo = ({ todo }) => {
  const [isDeleting, setisDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  let dateString = todo.reqDate.toDate().toString().substring(0, 15);
  return (
    <Wrapper>
    <Type>
      <img src='https://taskitplus.com/images/lawn maintenance.png' alt='mower' alt=""/>
   </Type>
   
      <Headings>
      <Heading noMargin size='h2'> {todo.type}</Heading>
      <Heading noMargin size='h2'> {todo.jobDetails}</Heading>
      <Heading  noMargin size='h4'> {dateString}</Heading>
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
        <DeleteJob
          job={todo}
          show={isDeleting}
          close={() => setisDeleting(false)}
        />
        <InputTodo
          editTodo={todo}
          opened={isEditing}
          close={() => setIsEditing(false)}
        />
      </Controls>
    </Wrapper>
  );
};

export default Todo;
