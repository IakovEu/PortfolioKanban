import { MyContext } from '../../others/context';
import { BacklogProps } from '../../others/types';
import st from './styles.module.scss';
import { useState, useContext, useRef } from 'react';

export const Backlog = ({ point }: BacklogProps) => {
	// Для изменение состояния даты
	const { dat, setDat } = useContext(MyContext);

	// Отслеживание клика на кнопку, показать / скрыть инпут
	const [isInputVisible, setisInputVisible] = useState<boolean>(false);

	// Отслеживание значения инпута
	const inputRef = useRef<HTMLInputElement>(null);

	// Обновляем дату, записываем обновленное в LS, обновляем бэклог
	const addBacklog = () => {
		setisInputVisible((prev) => !prev);

		let uniqueName = true; // не даст ввести одинаковое название

		dat!.forEach((elem) => {
			elem.issues.forEach((el) => {
				if (el.name === inputRef.current?.value) {
					uniqueName = false;
				}
			});
		});

		if (inputRef.current?.value && uniqueName) {
			const updatedDat = dat ? [...dat] : [];
			const backlogItem = { ...updatedDat[0] };

			backlogItem.issues.push({
				id: 1,
				name: inputRef.current.value,
				description: '',
			});

			updatedDat[0] = backlogItem;

			localStorage.setItem('data', JSON.stringify(updatedDat));
			setDat(updatedDat);
		}
	};

	return (
		<div className={st.block}>
			<h2 className={st.title}>Backlog</h2>
			<div className={st.notes}>
				{point}
				{isInputVisible && (
					<div>
						<input ref={inputRef} type="text" className={st.input}></input>
					</div>
				)}
			</div>
			<button
				className={!isInputVisible ? st.addBtn : `${st.addBtn} ${st.submitBtn}`}
				onClick={addBacklog}>
				{!isInputVisible ? (
					<>
						<span className={st.innerPlus}>+</span>&nbsp;
						<span>Add card</span>
					</>
				) : (
					<span>Submit</span>
				)}
			</button>
		</div>
	);
};
