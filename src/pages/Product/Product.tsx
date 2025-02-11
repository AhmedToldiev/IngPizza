import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

export function OneProduct() {
	const data  = useLoaderData() as Product;

	return <>Product - {data.name}</>;
}
