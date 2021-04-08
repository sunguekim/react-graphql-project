import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { validateSchema } from 'graphql';
import TwitterLogo from '../styles/assets/twitter-logo.png'
import "../styles/login.css"

const LOGIN_MUTATION = gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
    }
}
`

interface LoginValues {
    email: string
    password: string
}

const Login = () => {
    const history = useHistory()
    const [login, { data }] = useMutation(LOGIN_MUTATION)

    const initialValues: LoginValues = {
        email: '',
        password: '',
    }

    const validateSchema = Yup.object({
        email: Yup.string()
            .email("유효하지않는 이메일입니다")
            .required("이메일을 입력해주세요"),
        password: Yup.string()
            .max(20, "비밀번호는 20자 이하로만 작성해주세요")
            .required('비밀번호를 입력해주세요'),
    })

    return (
        <div className="container">
            <img
                src={TwitterLogo}
                alt='logo'
                style={{width: "50px"}}
                className="logo"
            />
            <h3>Login Twitter Clone</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const response = await login({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.login.token)
                    setSubmitting(false)
                    history.push('/')
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" component={'div'} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={'div'} />
                    <button type="submit" className="login-button"><span>로그인</span></button>
                </Form>
            </Formik>
            <div className="register">
                <Link to="/signup">Twitter Clone 가입</Link>
            </div>
        </div>
    )
}

export default Login
