/** @format */
'use client';
import { usePlaceholder } from '@redux-api/placeholder/usePlaceholder';

export default function GetPage() {
	const { data, setState, isLoading, isError, error } = usePlaceholder(1);
	if (isLoading) return <>...Loading</>;
	if (isError) return <>...Error:{error}</>;
	return (
		<div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
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
				value={data?.username}
				onChange={({ target: { value } }) =>
					setState((prevState) => ({ ...prevState, username: value }))
				}
			/>
		</div>
	);
}
