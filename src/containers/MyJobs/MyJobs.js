import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../../components/UI/Headings/Heading';
import { Container } from '../../hoc/layout/elements';
//import InputTodo from './InputTodo/InputTodo';
import Button from '../../components/UI/Forms/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import Job from '../../Jobs/Job/Job';

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLighter);
  color: var(--color-mainYellow)
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
  color: var(--color-mainLighter);
`;

const MyJobs = ({ jobs, requested, userId }) => {
  const [ setIsAdding] = useState(false);
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
      {console.log("userId : " + userId)}
        <Heading  size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else if (jobs[userId].jobs.length === 0) {
    content = (
      <Content>
        <Heading  size="h2">
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
            <Job key={job.id} job={job} />
          ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Heading noMargin size="h1" color='yellow'>
            Your Open Jobs
          </Heading>
          <Heading bold size="h4" color="yellow" >
            All you need to get done, for now...
          </Heading>
          <Heading noMargin bold size="h4" color="yellow">
            Or Not
          </Heading>
          <Button color="main" contain onClick={() => setIsAdding(true)}>
            Schedule Now
          </Button>
          {/* <InputTodo opened={isAdding} close={() => setIsAdding(false)} /> */}
          {content}
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
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
  firestoreConnect(props => [`jobs/${props.userId}`])
)(MyJobs);
