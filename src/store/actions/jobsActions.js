import * as actions from './actionTypes';


// Add a jobß
export const addJob = data => async (dispatch, getState, { getFirestore, getFirebase }) => {
    console.log(data);
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const aptNum = getState().firebase.profile.aptNum;
    dispatch({ type: actions.ADD_JOB_START });
    try {
      const res = await firestore
        .collection('jobs')
        .doc(userId)
        .get();
      const newJob = {
        id: new Date().valueOf(),
        jobDetails: data.details,
        type: data.type,
        reqDate: data.date,
        asap: data.asap,
        aptNum: aptNum || 'none'
      };
      if (!res.data()) {
        console.log('got here');
        firestore
          .collection('jobs')
          .doc(userId)
          .set({
            jobs: [newJob],
          });
      } else {
        firestore
          .collection('jobs')
          .doc(userId)
          .update({
            jobs: [...res.data().jobs, newJob],
          });
          console.log('got here 2');
      }
      dispatch({ type: actions.ADD_JOB_SUCCESS });
      return true;
    } catch (err) {
      dispatch({ type: actions.ADD_JOB_FAIL, payload: err.message });
    }
  };
  
  // edit Job
  export const editJob = (id, data) => async (
    dispatch,
    getState,
    { getFirestore }
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_JOB_START });
    try {
      const res = await firestore
        .collection('jobs')
        .doc(userId)
        .get();
      const jobs = res.data().jobs;
      const index = jobs.findIndex(job => job.id === id);
      jobs[index].job = data.job;
  
      await firestore
        .collection('jobs')
        .doc(userId)
        .update({
          jobs,
        });
      dispatch({ type: actions.ADD_JOB_SUCCESS });
      return true;
    } catch (err) {
      dispatch({ type: actions.ADD_JOB_FAIL, payload: err.message });
    }
  };
  
  // Delete Job
  export const deleteJob = id => async (
    dispatch,
    getState,
    { getFirestore }
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.DELETE_JOB_START });
    try {
      const res = await firestore
        .collection('jobs')
        .doc(userId)
        .get();
      const previousTodos = res.data().jobs;
      const newJobs = previousTodos.filter(job => job.id !== id);
      await firestore
        .collection('jobs')
        .doc(userId)
        .update({
          jobs: newJobs,
        });
      dispatch({ type: actions.DELETE_JOB_SUCCESS });
    } catch (err) {
      dispatch({ type: actions.DELETE_JOB_FAIL, payload: err.message });
    }
  };
  export const getCategories = () => async (
    { getFirestore }
    ) => {
      const firestore = getFirestore();
      console.log(firestore)
    try {
      const res = await firestore
        .collection('categories')
        .doc('cats')
        .get();
      const cats = res.data().cats;

      console.log('cats' + cats);
      return cats
    }catch (err) {
      console.log('error getting cats')
    }
  }