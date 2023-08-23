/** @format */
'use client';
import { useAppSelector, useAppDispatch } from '@redux/provider';
import { getPlaceholder, createState, changeUsername, changeEmail } from '@slices/placeholder/index';
import api from '@fetch/index';
export default function Redux() {
	const dispatch = useAppDispatch();
	const { username, email } = useAppSelector((state) => state.placeholder);
	//const { username, email } = useAppSelector(getPlaceholder);
	const createInitialState = async (id: number) => await api.get({ url: `users/${id}` });
	console.log('Redux', username, email);
	return (
		<div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
			<button
				type='button'
				className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				onClick={(e) => {
					e.preventDefault();
					createInitialState(1).then((response) => {
						console.log(response);
						dispatch(createState({ ...response?.data }));
					});
				}}
			>
				Get Data
			</button>
			<label
				htmlFor='username'
				className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				Username
			</label>
			<input
				id='username'
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
				type='text'
				value={username}
				onChange={({ target: { value } }) => dispatch(changeUsername({ username: value }))}
			/>
			<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				Email
			</label>
			<input
				id='email'
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
				type='email'
				value={email}
				onChange={({ target: { value } }) => dispatch(changeEmail({ email: value }))}
			/>
		</div>
	);
}
