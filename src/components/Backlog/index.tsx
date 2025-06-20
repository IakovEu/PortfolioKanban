import { MyContext } from '../../others/context';
import st from './styles.module.scss';
import { ReactNode, useState, useContext, useRef } from 'react';

interface TaskBlockProps {
	point?: ReactNode;
}

export const Backlog = ({ point }: TaskBlockProps) => {
	// Для изменение состояния даты
	const { dat, setDat } = useContext(MyContext);

	// Отслеживание клика на кнопку, показать / скрыть инпут
	const [input, setInput] = useState(false);

	// Отслеживание значения инпута
	const inputRef = useRef<HTMLInputElement>(null);

	// Обновляем дату, записываем обновленное в LS
	const addBacklog = () => {
		setInput((prev) => !prev);

		if (inputRef.current?.value) {
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
				{input && (
					<div>
						<input ref={inputRef} type="text" className={st.input}></input>
					</div>
				)}
			</div>
			<button
				className={!input ? st.addBtn : `${st.addBtn} ${st.submitBtn}`}
				onClick={() => {
					addBacklog();
				}}>
				{!input ? (
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
