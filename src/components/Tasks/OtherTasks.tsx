import { TaskProps } from '../../others/types';
import arrow2 from '../../images/arrow2.svg';
import st from './styles.module.scss';

export const Task = ({
	point,
	variants,
	title,
	disabled,
	visibility,
	setVisibiblity,
}: TaskProps) => {
	return (
		<div className={st.block}>
			<h2 className={st.title}>{title}</h2>
			<div className={st.notes}>{point}</div>
			{visibility && (
				<div className={st.addMenu}>
					<button className={st.addList} onClick={setVisibiblity}>
						<img src={arrow2} alt="V" />
					</button>
					<div className={st.menu}>{variants}</div>
				</div>
			)}
			<button
				className={st.addBtn}
				disabled={disabled}
				onClick={setVisibiblity}>
				<span className={st.innerPlus}>+</span>&nbsp;
				<span>Add card</span>
			</button>
		</div>
	);
};
