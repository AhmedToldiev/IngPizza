import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CardItem from '../../components/CardItem/CardItem';
import Heading from '../../components/Heading/Heading';
import styles from './Card.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cardActions } from '../../store/card.slice';

const DELIVERY_FEE = 169;

export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.card.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

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

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cardActions.clean());
		navigate('/success');
	};

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
						<div className={styles['text']}>
							Итог{' '}
							<span className={styles['total-count']}>({items.length})</span>
						</div>
						<div className={styles['price']}>
							{total + DELIVERY_FEE}&nbsp;<span>₽</span>
						</div>
					</div>
					<div className={styles['checkout']}>
						<Button appearence='big' onClick={checkout}>
							оформить
						</Button>
					</div>
				</>
			)}
		</>
	);
}
