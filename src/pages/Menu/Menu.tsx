import { ChangeEvent, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>('');
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		getMenu(filter);
	}, [filter]);
	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: { name },
			});
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

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && 'Загрузка пицц...'}
				{!isLoading && products.length === 0 && 'Не найдено пицц по запросу'}
			</div>
		</>
	);
}

export default Menu;
