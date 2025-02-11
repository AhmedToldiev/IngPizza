import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>('');
	const getMenu = async () => {
		try {
			setIsLoading(true);
			await new Promise<void>(resolve => {
				setTimeout(() => {
					resolve();
				});
			});
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			return;
		}
		// try {
		// 	const res = await fetch(`${PREFIX}/products`);
		// 	if (!res.ok) {
		// 		return;
		// 	}
		// 	const data = (await res.json()) as Product[];
		// 	setProducts(data);
		// } catch (error) {
		// 	console.error(error);
		// 	return;
		// }
	};

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && 'Загрузка...'}
			</div>
		</>
	);
}
