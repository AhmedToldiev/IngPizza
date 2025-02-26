import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Heading from '../../components/Heading/Heading';
import styles from './Product.module.css';
import Button from '../../components/Button/Button';
import { cardActions } from '../../store/card.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

export function OneProduct() {
	const data = useLoaderData() as Product;
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cardActions.add(data.id));
	};
	return (
		<Suspense fallback={'Загружаю...'}>
			<Await
				resolve={data}
				errorElement={<div>Не можем отобразить продукт😬</div>}
			>
				{(resolvedData: Product) => (
					<>
						<div className={styles['header']}>
							<Heading className={styles['heading-product']}>
								<img
									className={styles['back']}
									src='/back.png'
									alt='Назад'
									onClick={() => navigate('/')}
								/>
								{resolvedData.name}
							</Heading>
							<Button className={styles['to-buck']} onClick={add}>
								<img src='/cart-icon.svg' alt='Иконка корзины' /> В корзину
							</Button>
						</div>
						<div className={styles['description-product']}>
							<img src={resolvedData.image} alt='Изображение продукта' />
							<div className={styles['product-info']}>
								<p>
									<span>Цена:</span> <span>{resolvedData.price} ₽</span>
								</p>
								<p>
									<span>Рейтинг:</span> <span >{resolvedData.rating} ⭐</span>
								</p>
								<p>Состав:</p>
								<ul>
									{resolvedData.ingredients.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						</div>
					</>
				)}
			</Await>
		</Suspense>
	);
}
