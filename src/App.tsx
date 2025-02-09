import { MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Link } from 'react-router-dom';


function App() {

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};
	return (
		<>
			<Button onClick={addCounter}>Кнопка</Button>
			<Button appearence='big' onClick={addCounter}>
				Кнопка
			</Button>
			<Input />
			<div>
				<Link to='/'>Меню</Link>
				<Link to='/card'>Корзина</Link>
			</div>
		</>
	);
}

export default App;
