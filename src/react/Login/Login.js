import { useFormik } from 'formik'

// redux
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Key } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'

// reducers
import { loginUserAction } from '../../redux/authentication/AuthenticationSlices'

import DisabledButton from '../Nav/Buttons/DisabledButton'

//form validations
const formSchema = Yup.object({
	userID: Yup.string().required('userID is required'),
	password: Yup.string().required('Password is required')
})

const Login = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => state?.auth)
	const { userAppErr, userServerErr, userLoading } = user

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

			{userAppErr || userServerErr ? (
				<div className='alert alert-danger' role='alert'>
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
				<div className='text-danger mb-2'>{formik.touched.password && formik.errors.password}</div>

				<div>
					{' '}
					{userLoading ? (
						<DisabledButton />
					) : (
						<Button id='LoginButton' type='submit' className='btn btn-primary py-2 w-100 mb-4'>
							<Key size={20} /> Login
						</Button>
					)}
				</div>
			</form>
		</div>
	)
}

export default Login
