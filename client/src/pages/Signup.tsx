import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { validateSchema } from 'graphql';
import TwitterLogo from '../styles/assets/twitter-logo.png'
import "../styles/login.css"

const SIGNUP_MUTATION = gql`
mutation signup($name:String,$email:String!,$password:String!){
    signup(name:$name,email:$email,password:$password){
        token
    }
}
`
interface SignupValues {
    email: string
    password: string
    confirmPassword: string
    name: string
}

const Signup = () => {
    const history = useHistory()
    const [signup, { data }] = useMutation(SIGNUP_MUTATION)
    const initialValues: SignupValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    }

    const validateSchema = Yup.object({
        email: Yup.string()
            .email("유효하지않는 이메일입니다")
            .required("이메일을 입력해주세요"),
        password: Yup.string()
            .max(20, "비밀번호는 20자 이하로만 작성해주세요")
            .required('비밀번호를 입력해주세요'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")],
                "패스워드가 일치하지 않습니다"),
        name: Yup.string()
            .max(15, '이름을 15자 이하로 입력해주세요')
            .required('이름을 입력해주세요')
    })

    return (
        <div>
            <img
                src={TwitterLogo}
                alt='logo'
                style={{ width: "50px" }}
                className="logo"
            />
            <h3>계정을 생성하세요</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const response = await signup({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.signup.token)
                    setSubmitting(false)
                    history.push('/')
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" component={'div'} />
                    <Field name="name" type="text" placeholder="Name" />
                    <ErrorMessage name="name" component={'div'} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={'div'} />
                    <Field name="confirmpassword" type="password" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmpassword" component={'div'} />
                    <button type="submit" className="login-button"><span>회원가입</span></button>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup
