import st from './styles.module.scss';
import { Backlog } from '../Backlog';
import { useEffect, useContext } from 'react';
import { initialData } from '../../others/initialLocalStorage';
import { MyContext } from '../../others/context';

export const Content = () => {
	const { dat, setDat } = useContext(MyContext);
	
	// Заполняю LS и дату
	useEffect(() => {
		if (!localStorage.getItem('data')) {
			localStorage.setItem('data', JSON.stringify(initialData));
			setDat(initialData);
		} else {
			setDat(JSON.parse(localStorage.getItem('data')!));
		}
	}, []);

	return (
		<div className={st.container}>
			<Backlog
				point={
					dat &&
					dat[0].issues.map((el, ind) => {
						return <div key={ind}>{el.name}</div>;
					})
				}
			/>
		</div>
	);
};
