import st from './styles.module.scss';
import { Backlog } from '../Tasks/Backlog';
import { Task } from '../Tasks/OtherTasks';
import { useEffect, useContext, useState } from 'react';
import { initialData } from '../../others/initialLocalStorage';
import { MyContext } from '../../others/context';

export const Content = () => {
	const { dat, setDat } = useContext(MyContext);

	// Отслеживание клика на кнопку, показать / скрыть выпадающее меню у Ready, inProgress и Finished
	const [isReadyMenuVisible, setIsReadyMenuVisible] = useState(false);
	const [isProgMenuVisible, setIsProgMenuVisible] = useState(false);
	const [isFinMenuVisible, setIsFinMenuVisible] = useState(false);

	// Заполняю LS и дату
	useEffect(() => {
		if (!localStorage.getItem('data')) {
			localStorage.setItem('data', JSON.stringify(initialData));
			setDat(initialData);
		} else {
			setDat(JSON.parse(localStorage.getItem('data')!));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Заполняю пункты
	const fillPoints = (num: number) => {
		return dat![num].issues.map((el, ind) => {
			return <div key={ind}>{el.name}</div>;
		});
	};

	// Заполняю варианты
	const fillVariants = (num: number) => {
		return dat![num].issues.map((el, ind) => {
			return (
				<div
					key={ind}
					onClick={(ev) => {
						chooseVariant(ev, num);
					}}>
					{el.name}
				</div>
			);
		});
	};

	// Обработка клика в fillVariants (выбор пункта из выпадающего списка) и сохранение новой даты
	const chooseVariant = (ev: React.MouseEvent<HTMLDivElement>, N: number) => {
		const variant = ev.currentTarget.textContent;

		const updatedDat = dat ? [...dat] : [];

		updatedDat[N + 1].issues.push({ id: 123, name: variant, description: '' });
		updatedDat[N].issues = updatedDat[N].issues.filter(
			(el) => el.name !== variant
		);

		localStorage.setItem('data', JSON.stringify(updatedDat));
		setDat(updatedDat);
		N === 0 && setIsReadyMenuVisible(false);
		N === 1 && setIsProgMenuVisible(false);
		N === 2 && setIsFinMenuVisible(false);
	};

	// Backlog вывел отдельно, чтобы аккуратнее внутри выглядело, тк он немного отличается
	return (
		<div className={st.container}>
			<Backlog point={dat && fillPoints(0)} />
			<Task
				point={dat && fillPoints(1)}
				variants={dat && fillVariants(0)}
				title="Ready"
				disabled={dat ? dat[0].issues.length === 0 : true}
				visibility={isReadyMenuVisible}
				setVisibiblity={() => {
					setIsReadyMenuVisible((prev) => !prev);
				}}
			/>
			<Task
				point={dat && fillPoints(2)}
				variants={dat && fillVariants(1)}
				title="In progress"
				disabled={dat ? dat[1].issues.length === 0 : true}
				visibility={isProgMenuVisible}
				setVisibiblity={() => {
					setIsProgMenuVisible((prev) => !prev);
				}}
			/>
			<Task
				point={dat && fillPoints(3)}
				variants={dat && fillVariants(2)}
				title="Finished"
				disabled={dat ? dat[2].issues.length === 0 : true}
				visibility={isFinMenuVisible}
				setVisibiblity={() => {
					setIsFinMenuVisible((prev) => !prev);
				}}
			/>
		</div>
	);
};
