import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { loginUserAction } from '../../redux/slices/users/UsersSlices'

import DisabledButton from './DisabledButton'

//form validations
const formSchema = Yup.object({
	userID: Yup.string().required('userID is required'),
	password: Yup.string().required('Password is required')
})

const Login = () => {
	//dispatch
	const dispatch = useDispatch()

	//get data from store
	const user = useSelector(state => state?.users)
	const { userAppErr, userServerErr, userLoading, userAuth } = user

	//formik form
	const formik = useFormik({
		initialValues: {
			userID: '',
			password: ''
		},
		onSubmit: values => {
			dispatch(loginUserAction(values))
		},
		validationSchema: formSchema
	})

	return (
		<div className='p-5 bg-light rounded text-center'>
			<span className='text-muted'>Sign In</span>
			<h3 className='fw-bold mb-5'>Login to your account</h3>
			{/* Display Err */}

			{userAppErr || userServerErr ? (
				<div class='alert alert-danger' role='alert'>
					{userServerErr} {userAppErr}
				</div>
			) : null}
			<form onSubmit={formik.handleSubmit}>
				<input
					id='LoginUserIDInput'
					value={formik.values.userID}
					onChange={formik.handleChange('userID')}
					onBlur={formik.handleBlur('userID')}
					className='form-control mb-2'
					type='userID'
					placeholder='userID'
				/>
				{/* Err */}
				<div className='text-danger mb-2'>{formik.touched.userID && formik.errors.userID}</div>
				<input
					id='LoginPasswordInput'
					value={formik.values.password}
					onChange={formik.handleChange('password')}
					onBlur={formik.handleBlur('password')}
					className='form-control mb-2'
					type='password'
					placeholder='Password'
				/>
				{/* Err */}
				<div className='text-danger mb-2'>{formik.touched.password && formik.errors.password}</div>

				<div>
					{userLoading ? (
						<DisabledButton />
					) : (
						<button id='LoginButton' type='submit' className='btn btn-primary py-2 w-100 mb-4'>
							Login
						</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default Login
