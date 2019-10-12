import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Message from '../../../components/UI/Message/Message';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

import * as actions from '../../../store/actions';
import * as fb from 'firebase';

let storageRef = fb.storage().ref();
const MessageWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 3rem;
  
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: block;
  position: relative;
  margin: auto;

  $ .profile-image{
    max-width: 150px
  }

  @media only screen and (min-width: 37.5em){
    transform: rotate(90deg);
  }

  @media ${props => props.theme.mediaQueries.small} {
    transform: rotate(90deg);
  }

  `;

const ImgWrap = styled(Image)`
width: 150px;

`
const AccountWrapper = styled.div`
   width: 100%;
   padding: 3rem 1rem;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLighter);
  `
  

  const EditImageBtn = styled.button`
    margin: 1rem;
    background: var(--color-white)
  `

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  justify-content: space-around;
  
`;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Your first name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  lastName: Yup.string()
    .required('Your last name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  aptNum: Yup.string().max(3),
  password: Yup.string().min(8, 'The password is too short.'),
  confirmPassword: Yup.string().when('password', {
    is: password => password.length > 0,
    then: Yup.string()
      .required('You need to confirm your password.')
      .oneOf([Yup.ref('password'), null], `Password doesn't match`),
  }),
});

const Profile = ({
  firebase,
  editProfile,
  loading,
  error,
  loadingDelete,
  errorDelete,
  deleteUser,
  cleanUp,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleImageChange = (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    let formData = new FormData();
    formData.append('image', image, image.name);
    uploadTask(image);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const [modalOpened, setModalOpened] = useState(false);
  
 

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
function uploadTask(file) { 
  console.log(file)
  let fileUpload = storageRef.child('userImages').child(firebase.auth.uid).put(file);
    fileUpload.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case fb.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case fb.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;          
          default:
            break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {

      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      fileUpload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      
        console.log('File available at', downloadURL);
        fb.firestore().collection('users/').doc(firebase.auth.uid).update({
          
          imgUrl: downloadURL
      });
        //TODO
      // update image in jobs
    })

  })
}

   
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  

  if (!firebase.profile.isLoaded) return null;
  return (
    <AccountWrapper>
     
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          confirmPassword: '',
          imgUrl: firebase.profile.imgUrl,
          aptNum: firebase.profile.aptNum
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // edit the profile here
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (

          <FormWrapper>
          <Heading  size="h2" color="white">
              {firebase.auth.email}
            </Heading>
            <Heading noMargin size="h4" color="white">
            {firebase.profile.username}
            </Heading>
            <Heading noMargin size="h1" color="white">
              Edit your profile
            </Heading>
            <Heading bold size="h4" color="white">
              Here you can edit your profile
            </Heading>
            
            <ImgWrap src={firebase.profile.imgUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <EditImageBtn
                type="button"
                onClick={handleEditPicture}
                className="button"
              >
                <p>Change</p>
              </EditImageBtn>
            <StyledForm>
              <Field
                type="text"
                name="firstName"
                placeholder="Your first name..."
                component={Input}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Your last name..."
                component={Input}
              />

            <Field
                type="text"
                name="aptNum"
                placeholder="Apt number - ex:V2"
                component={Input}
              />
              {/* <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={Input}
              /> */}
              <Field
                type="password"
                name="password"
                placeholder="Your password..."
                component={Input}
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Re-type your password..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? 'Editing...' : null}
                type="submit"
              >
                Edit
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Profile was updated!
                </Message>
              </MessageWrapper>
              <DeleteWrapper onClick={() => setModalOpened(true)}>
                Delete my account
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <Heading noMargin size="h1" color="white">
          Delete your account
        </Heading>
        <Heading bold size="h4" color="white">
          Do you really want to delete your account?
        </Heading>
        <ButtonsWrapper>
          <Button
            contain
            onClick={() => deleteUser()}
            color="red"
            disabled={loadingDelete}
            loading={loadingDelete ? 'Deleting...' : null}
          >
            Delete
          </Button>
          <Button color="main" contain onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </ButtonsWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
      </AccountWrapper>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
