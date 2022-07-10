import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'

export default function LoginForm() {
	/** to excecute actions */
	const dispatch = useDispatch()
	return (
		<div>
			<Formik
				initialValues={{
					userID: '',
					password: '',
				}}
				onSubmit={async values => {
					await new Promise(r => setTimeout(r, 500))
					alert(JSON.stringify(values, null, 2))
				}}
			>
				<Form>
					<label htmlFor='userID'></label>
					<Field id='LoginUserIDInput' name='userID' placeholder='userID' />

					<label htmlFor='password'></label>
					<Field id='LoginPasswordInput' name='password' placeholder='password' />

					<button id='LoginButton' type='submit'>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	)
}
