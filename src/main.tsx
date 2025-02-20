import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout/Layout.tsx';
import Card from './pages/Card/Card.tsx';
import Error from './pages/Error/Error.tsx';
import { OneProduct } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { RequireAuth } from './helpers/RequiredAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/Card',
				element: <Card />,
			},
			{
				path: '/product/:id',
				element: <OneProduct />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					await new Promise<void>(resolve => {
						setTimeout(() => {
							resolve();
						}, 2000);
					});
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				},
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
