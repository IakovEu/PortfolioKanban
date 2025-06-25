import { useState, useRef, useEffect } from 'react';
import { LocalS } from '../../others/types';
import st from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const TaskDescription = () => {
    // Общие данные
	const data: LocalS[] = JSON.parse(localStorage.getItem('data')!);
	// Для перехода на главную
	const navigate = useNavigate();
	// Индекс элемента
	const elementId = +useLocation().pathname.replace('/tasks/', '').slice(2);
	// Индекс блока
	const block = +useLocation().pathname.replace('/tasks/', '').slice(0, 1);
	// Отслеживание изменений ввода
	const [text, setText] = useState(data[block].issues[elementId]?.description);
	// Автоизменение высоты у текстареа
	const areaRef = useRef<HTMLTextAreaElement | null>(null);

	// Обновляем text при изменении данных или параметров
	useEffect(() => {
		const issue = data[block].issues.find((issue) => issue.id === elementId);
		setText(issue?.description || '');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Расширение поля ввода
	useEffect(() => {
		if (areaRef.current) {
			areaRef.current.style.height = 'auto';
			areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
		}
	}, [text]);

	// Закрыть описание и сохранить изменения
	const closeDescription = () => {
		if (areaRef.current) {
			const updatedData = [...data];

			const updatedBlock = updatedData[block].issues.map((el) => {
				if (areaRef.current && el.id === elementId) {
					el.description = areaRef.current?.value;
					return el;
				}
				return el;
			});

			updatedData[block].issues = updatedBlock;
			localStorage.setItem('data', JSON.stringify(updatedData));
		}
		navigate(`/`);
	};

	return (
		<div className={st.container}>
			<div className={st.top}>
				<h2 className={st.title}>
					{data[block].issues.find((elem) => {
						return elem.id === elementId;
					})?.name ?? ''}
				</h2>
				<button className={st.closeBtn} onClick={closeDescription}>
					&#x2715;
				</button>
			</div>
			<textarea
				ref={areaRef}
				className={st.textarea}
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
				placeholder="This task has no description"
			/>
		</div>
	);
};
