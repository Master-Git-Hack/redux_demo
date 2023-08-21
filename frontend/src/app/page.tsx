/** @format */

import { Provider } from 'react-redux';
import { store } from '@redux';
//theme
import 'primereact/resources/themes/tailwind-light/theme.css';
//core
import 'primereact/resources/primereact.min.css';
export default function Home() {
	return (
		<Provider store={store}>
			<main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
		</Provider>
	);
}
