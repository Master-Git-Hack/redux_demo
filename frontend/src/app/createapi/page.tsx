/** @format */

'use client';

import { useGetUsersQuery } from '@redux-api/placeholder';

export default function Page() {
	const { data, error, isLoading, isError } = useGetUsersQuery(null);
	if (isLoading) return <>...Loading</>;
	if (isError) return <>...Error:{error}</>;

	return (
		<div className='flex min-h-screen flex-col items-center justify-between p-24'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Key
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Value
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{data?.map((user, idx) => {
						//console.log(user);
						const keys = Object.keys(user);
						//console.log(keys);
						const keysToCheck = ['address', 'company'];
						const filteredKeys = keys.filter((key) => !keysToCheck.includes(key));
						//console.log(filteredKeys);
						return (
							<tr key={idx}>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-900'>
										{filteredKeys?.map((key, index) => (
											<div key={`${key}-${index}`}>{key}</div>
										))}
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-900'>
										{filteredKeys?.map((key, index) => (
											<div key={`${key}-${index}`}>{user[key]}</div>
										))}
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
