import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Heading from '../../components/UI/Headings/Heading';
import { Container } from '../../hoc/layout/elements';
import InputTodo from '../../containers/Todos/InputTodo/InputTodo';
import Button from '../../components/UI/Forms/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import Job from '../../Jobs/Job/Job';
import Todo from '../../containers/Todos/Todo/Todo'

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLighter);
`;
 const ContainerWrap = styled(Container)`
  padding: 0;

 `
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
`;

const MyJobs = ({ jobs, requested, userId}) => {
  const [isAdding, setIsAdding] = useState(false);
  let content;
  if (!jobs) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  } else if (!jobs[userId] || !jobs[userId].jobs) {
    content = (
      <Content>
        <Heading color="white" size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else if (jobs[userId].jobs.length === 0) {
    content = (
      <Content>
        <Heading color="white" size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else {
    content = (
      <Content>
      {console.log(jobs)}
        {jobs[userId].jobs
          .slice(0)
          .reverse()
          .map(job => (
            <Todo key={job.id} todo={job} />
          ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <ContainerWrap>
        <InnerWrapper>
          <Heading noMargin size="h1" color="white">
            Your Todos
          </Heading>
          <Heading bold size="h4" color="white">
            All you have to do for now...
          </Heading>
          <Link to='/addJob'><Button color="main" contain>
            Add Todo
          </Button></Link>
          {/* <InputTodo opened={isAdding} close={() => setIsAdding(false)} /> */}
          {content}
        </InnerWrapper>
      </ContainerWrap>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore
}) => ({
  userId: firebase.auth.uid,
  jobs: firestore.data.jobs,
  categories: firestore.data.categories,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
  
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection:  'jobs'}
   
  
])

  
)(MyJobs);
