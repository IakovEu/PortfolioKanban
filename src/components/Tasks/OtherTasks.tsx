import { useState } from 'react';
import { TaskProps } from '../../others/types';
import arrow2 from '../../images/arrow2.svg';
import st from './styles.module.scss';

export const Task = ({ point, variants, title }: TaskProps) => {
	// Отслеживание клика на кнопку, показать / скрыть выпадающее меню
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

	return (
		<div className={st.block}>
			<h2 className={st.title}>{title}</h2>
			<div className={st.notes}>{point}</div>
			{isMenuVisible && (
				<div className={st.addMenu}>
					<button
						className={st.addList}
						onClick={() => {
							setIsMenuVisible((prev) => !prev);
						}}>
						<img src={arrow2} alt="V" />
					</button>
					<div className={st.menu}>{variants}</div>
				</div>
			)}
			<button
				className={st.addBtn}
				disabled={!!1}
				onClick={() => {
					setIsMenuVisible((prev) => !prev);
				}}>
				<span className={st.innerPlus}>+</span>&nbsp;
				<span>Add card</span>
			</button>
		</div>
	);
};
