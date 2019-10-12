import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const JobDetails = (props) => {
  const { job, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (job) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{job.type}</span>
            <p>{job.details}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {job.posterName} </div>
            <div>House Num {job.aptNum} </div>
            <div>{moment(job.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const jobs = state.firestore.data.jobs;
  const job = jobs ? job[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'jobs'
  }])
)(jobDetails)
