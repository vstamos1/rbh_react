import React from 'react'
import { withRouter } from 'react-router-dom'
// this also works with react-router-native

export const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/myJobs')
    console.log('cool') }}
  >
    Add Job
  </button>
))