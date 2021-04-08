import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { ME_QUERY } from '../pages/Profile';
import Modal from 'react-modal'
import { customStyles } from '../styles/CustomStyles';

const CREATE_PROFILE_MUTATION = gql`
        mutation createProfile(
            $bio:String
            $location:String
            $website:String
            $avatar:String
        ){
            createProfile(
                bio:$bio
                location:$location
                website:$website
                avatar:$avatar
            ){
                id
            }
        }
`
interface ProfileValues {
    bio: string
    location: string
    website: string
    avatar: string
}

const CreateProfile = () => {
    const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    })
    const [modalIsOPen, setIsOpen] = useState(false)

    const initialValues: ProfileValues = {
        bio: "",
        location: "",
        website: "",
        avatar: ""
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal} className="edit-button">
                Create Profile
            </button>
            <Modal isOpen={modalIsOPen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customStyles}
            >


                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        await createProfile({
                            variables: values
                        })

                        setSubmitting(false)
                        setIsOpen(false)
                    }}
                >
                    <Form>
                        <Field name="bio" type="text" as="textarea" placeholder="Bio" />
                        <ErrorMessage name="bio" component={'div'} />
                        <Field name="location" type="location" placeholder="Location" />
                        <ErrorMessage name="location" component={'div'} />
                        <Field name="website" type="website" placeholder="website" />
                        <ErrorMessage name="website" component={'div'} />
                        <button type="submit" className="login-button">
                            <span>프로필 생성</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}

export default CreateProfile;
