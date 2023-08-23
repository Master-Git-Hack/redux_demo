/** @format */

import { useGetUsersByIdQuery } from '@redux-api/placeholder';
import { useState, useEffect } from 'react';
export const usePlaceholder = (id: number) => {
	const { data, error, isLoading, isError } = useGetUsersByIdQuery(id);
	const [state, setState] = useState(data);
	console.log('usePlaceholder', state);
	useEffect(() => {
		if (!isLoading && data !== undefined) {
			setState(data);
		}
	}, [data, isLoading]);
	return {
		data: state,
		error,
		isLoading,
		isError,
		setState,
	};
};
