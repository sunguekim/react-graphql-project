import { gql, useMutation } from "@apollo/client"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React from "react"
import { Link, useHistory } from "react-router-dom"
import * as Yup from "yup"
import TwitterLogo from "../styles/assets/twitter-logo.png"
import "../styles/login.css"

const SIGNUP_MUTATION = gql`
	mutation signup($name: String, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
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

function Signup() {
	const history = useHistory()
	const [ signup, { data } ] = useMutation(SIGNUP_MUTATION)

	const initialValues: SignupValues = {
		email: "",
		password: "",
		confirmPassword: "",
		name: ""
	}

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("이메일을 입력해주세요"),
		password: Yup.string().max(20, "Must be 20 characters or less").required("비밀번호를 입력해주세요"),
		confirmPassword: Yup.string().oneOf([ Yup.ref("password") ], "비밀번호가 일치하지 않습니다"),
		name: Yup.string().max(15, "Must be 15 characters or less").required("이름을 입력해주세요")
	})

	return (
		<div className="container">
			<img src={TwitterLogo} alt="logo" style={{ width: "50px" }} className="logo" />
			<h3>가입하기</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true)
					const response = await signup({
						variables: values
					})
					localStorage.setItem("token", response.data.signup.token)
					setSubmitting(false)
					history.push("/")
				}}
			>
				<Form>
					<Field name="email" type="text" placeholder="Email" />
					<ErrorMessage name="email" component={"div"} />
					<Field name="name" type="text" placeholder="Name" />
					<ErrorMessage name="name" component={"div"} />
					<Field name="password" type="password" placeholder="Password" />
					<ErrorMessage name="password" component={"div"} />
					<Field name="confirmPassword" type="password" placeholder="Confirm Password" />
					<ErrorMessage name="confirmPassword" component={"div"} />
					<button type="submit" className="login-button">
						<span>가입하기</span>
					</button>
				</Form>
			</Formik>
			<div className="register">
				<h4>이미 계정이 있으십니까?</h4>
				<Link to="/login">로그인</Link>
			</div>
		</div>
	)
}

export default Signup
