import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { ME_QUERY } from '../pages/Profile';
import Modal from 'react-modal'
import { customStyles } from '../styles/CustomStyles';

const UPDATE_PROFILE_MUTATION = gql`
        mutation updateProfile(
            $id:Int!
            $bio:String
            $location:String
            $website:String
            $avatar:String
        ){
            updateProfile(
                id:$id
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
    id: number
    bio: string
    location: string
    website: string
    avatar: string
}

const UpdateProfile = () => {
    const { loading, error, data } = useQuery(ME_QUERY)

    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    })

    const [modalIsOPen, setIsOpen] = useState(false)

    if (loading) return <p>Loding.....</p>
    if (error) return <p> {error.message}</p>

    const initialValues: ProfileValues = {
        id: data.me.Profile.id,
        bio: data.me.Profile.bio,
        location: data.me.Profile.location,
        website: data.me.Profile.website,
        avatar: data.me.Profile.avatar,
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
                Update Profile
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
                        await updateProfile({
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
                            <span>프로필 갱신</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}

export default UpdateProfile;
