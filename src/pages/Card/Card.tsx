import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CardItem from '../../components/CardItem/CardItem';
import Heading from '../../components/Heading/Heading';
import styles from './Card.module.css';

const DELIVERY_FEE = 169;

export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.card.items);
	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Heading className={styles['heading']}>Корзина</Heading>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) {
					return;
				}
				return <CardItem key={product.id} count={i.count} {...product} />;
			})}
			{items.length > 0 && (
				<>
					<div className={styles['line']}>
						<div className={styles['text']}>Итог</div>
						<div className={styles['price']}>
							{total}&nbsp;<span>₽</span>
						</div>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['line']}>
						<div className={styles['text']}>Доставка</div>
						<div className={styles['price']}>
							{DELIVERY_FEE}&nbsp;<span>₽</span>
						</div>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['line']}>
						<div className={styles['text']}>Итог {items.length}</div>
						<div className={styles['price']}>
							{total + DELIVERY_FEE}&nbsp;<span>₽</span>
						</div>
					</div>
				</>
			)}
		</>
	);
}
