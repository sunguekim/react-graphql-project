import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Link, useHistory } from "react-router-dom"
import CreateProfile from '../components/CreateProfile';
import UpdateProfile from '../components/UpdateProfile';
import "../styles/profile.css"
import "../styles/primary.css"


export const ME_QUERY = gql`
        query me{
            me{
                id
                name
                Profile{
                    id
                    bio
                    location
                    website
                    avatar
                }
            }
        }
`

const Profile = () => {
    const history = useHistory()
    const { loading, error, data } = useQuery(ME_QUERY)
    if (loading) return <p>Loding.....</p>
    if (error) return <p> {error.message}</p>
    return (
        <>
            <div className="primary">
                <div className="left">left</div>
                    <div className="profile">
                        <div className="profile-info">
                            <div className="profile-head">
                                <span className="back-arrow" onClick={() => { history.goBack() }}>
                                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                </span>
                                <span className="nickname">
                                    <h3>
                                        {data.me.name}
                                    </h3>
                                </span>
                            </div>
                            <div className="avatar">
                                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            </div>
                            <div className="make-profile">
                                {data.me.Profile ? <UpdateProfile /> : <CreateProfile />}
                            </div>
                            <h3 className="name">{data.me.name}</h3>
                            {data.me.Profile ? (
                                <p>
                                    <i className="fas fa-link"></i>{""}
                                    <Link
                                        to={{ pathname: `http://${data.me.Profile.website}` }}
                                    >
                                        {data.me.Profile.website}
                                    </Link>
                                </p>
                            ) : null}
                            <div className="followers">
                                <p>200 follwing!!!</p>
                                <p>200 follwing!!!</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        right
                    </div>
                </div>
            
        </>
    );
}

export default Profile;
